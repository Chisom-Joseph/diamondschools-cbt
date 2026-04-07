const router = require("express").Router();

router.use(require("../middlewares/setSiteSettings"));
router.use(require("../middlewares/loginVerifire"));
const verifyAccess = require("../middlewares/verifyAccess");
router.use("/quiz", verifyAccess, require("./quiz"));
router.use("/auth", require("./auth"));

// Home
router.get("/", (req, res) => {
  res.redirect("/quiz/exam-details");
});

// Temp admin route
router.get("/admin/result", verifyAccess, async (req, res) => {
  res.render("tempResult", {
    results: await require("../helpers/getResults")(req.candidate.id),
    siteSettings: req.siteSettings,
  });
});

// Notifications
router.get("/notifications", async (req, res) => {
  const {
    UserNotification,
    Notification,
    Student,
    Aspirant,
  } = require("../models");

  let notifications = [];
  let unseenBroadcasts = [];
  let candidateId, fkField;

  try {
    candidateId = req.candidate.id;
    const isAspirant = req.isAspirant;

    const audienceType = isAspirant ? 'all-aspirants' : 'all-students';
    fkField = isAspirant ? 'AspirantId' : 'StudentId';
    const Model = isAspirant ? Aspirant : Student;

    // 1. Get broadcast notifications for this audience type
    const broadcasts = await Notification.findAll({
      where: { targetAudience: audienceType },
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    // 2. Get notifications linked to this user via UserNotification
    //    (includes: legacy, specific, and previously-viewed broadcasts)
    const [userWithNotifications] = await Model.findAll({
      where: { id: candidateId },
      include: [
        {
          model: Notification,
          through: {
            attributes: ["seen"],
          },
        },
      ],
    });

    const joinedNotifications = userWithNotifications?.Notifications || [];
    const joinedIds = new Set(joinedNotifications.map(n => n.id));

    // 3. Merge: broadcasts not yet in joined set are unseen
    unseenBroadcasts = broadcasts.filter(b => !joinedIds.has(b.id));
    notifications = [
      ...unseenBroadcasts.map(b => ({ ...b, seen: false })),
      ...joinedNotifications.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        targetAudience: n.targetAudience,
        createdAt: n.createdAt,
        seen: n.UserNotification?.seen ?? false,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.log("Error fetching notifications:", error);
  }

  // Always render (even if fetching failed, show whatever we have)
  res.render("notifications", {
    notifications,
    siteSettings: req.siteSettings,
  });

  // Track seen status after response is sent (errors here won't affect the user)
  try {
    for (const b of unseenBroadcasts) {
      await UserNotification.findOrCreate({
        where: { [fkField]: candidateId, NotificationId: b.id },
        defaults: { seen: true },
      });
    }
    await UserNotification.update(
      { seen: true },
      { where: { [fkField]: candidateId, seen: false } }
    );
  } catch (trackingError) {
    console.log("Error tracking notification seen status:", trackingError);
  }
});

// 404
router.get("*", (req, res) => {
  res.status(404).render("error", {
    title: "Page not found",
    message: "Recourse not found",
    siteSettings: req.siteSettings,
  });
});

module.exports = router;
