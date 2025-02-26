const moment = require("moment");
const { ExamSettings } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const examSettings = await ExamSettings.findOne({
      where: { uniqueKey: 1 },
    });

    if (!examSettings) {
      return res.render("message", {
        title: "Hold on",
        message: {
          title: "Opps!",
          body: "Something went worng, please contact the admin",
        },
      });
    }

    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm");

    const { startDate, endDate, startTime } = examSettings;

    // Check if exam is scheduled for a future date
    if (currentDate < startDate) {
      return res.render("message", {
        title: "Too early",
        message: {
          title: "Too early",
          body: `Exam is scheduled to start on: ${moment(
            startDate,
            "YYYY-MM-DD"
          ).format("dddd, Do MMMM")}`,
        },
      });
    }

    // Check if current time is before start time on the start date
    if (currentDate === startDate && currentTime < startTime) {
      return res.render("message", {
        title: "Too early",
        message: {
          title: "Too early",
          body: `Exam is scheduled to start by: ${moment(
            startTime,
            "HH:mm"
          ).format("hh:mm A")}`,
        },
      });
    }

    // Check if exam has already ended
    if (currentDate > endDate) {
      return res.render("message", {
        title: "Too late",
        message: {
          title: "Too late",
          body: "Exams have ended",
        },
      });
    }

    next();
  } catch (error) {
    console.error("ERROR VERIFYING ACCESS");
    console.error(error);
    res.render("message", {
      title: "Hold on",
      message: {
        title: "Opps!",
        body: "Something went worng",
      },
    });
  }
};
