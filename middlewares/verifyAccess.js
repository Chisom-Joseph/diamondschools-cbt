const moment = require("moment");
const { ExamSettings } = require("../models");
const formatDate = require("../helpers/formatDate");
const formatTime = require("../helpers/formatTime");
const checkFeatureAccess = require("../helpers/checkFeatureAccess");

module.exports = async (req, res, next) => {
  try {
    const isAspirant = req.isAspirant;
    const isFeatureEnabled = await checkFeatureAccess(
      "cbt-portal",
      `${isAspirant ? "aspirant" : "student"}`,
      null
    );
    if (!isFeatureEnabled) {
      return renderMessage(
        res,
        "Page Disabled",
        "You cannot access this feature at this time because it has been disabled by the admins.",
        req.siteSettings
      );
    }

    const examSettings = await ExamSettings.findOne({
      where: { uniqueKey: 1 },
    });

    if (!examSettings) {
      return renderMessage(
        res,
        "Oops!",
        "Something went wrong, please contact the admin",
        req.siteSettings
      );
    }

    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm");

    const { startDate, endDate, startTime, aspirantExaminationDate } =
      examSettings;
    const examStartDate = isAspirant ? aspirantExaminationDate : startDate;

    // Exam not started yet
    if (currentDate < examStartDate) {
      return renderMessage(
        res,
        "Too early",
        `Exam is scheduled to start on: ${formatDate(examStartDate)}`,
        req.siteSettings
      );
    }

    // Exam starts today but time is not reached
    if (currentDate === examStartDate && currentTime < startTime) {
      return renderMessage(
        res,
        "Too early",
        `Exam is scheduled to start by: ${formatTime(startTime)}`,
        req.siteSettings
      );
    }

    // Exam has already ended
    if (currentDate > endDate) {
      return renderMessage(res, "Too late", "Exams have ended", req.siteSettings);
    }

    next();
  } catch (error) {
    console.error("ERROR VERIFYING ACCESS", error);
    return renderMessage(res, "Oops!", "Something went wrong", req.siteSettings);
  }
};

// Helper function to render messages
const renderMessage = (res, title, body, siteSettings) => {
  return res.render("message", {
    title,
    message: { title, body },
    siteSettings,
  });
};
