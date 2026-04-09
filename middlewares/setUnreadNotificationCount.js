const { UserNotification, Notification, Student, Aspirant } = require("../models");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
  try {
    if (!req.candidate) {
      res.locals.unreadNotificationCount = 0;
      return next();
    }

    const candidateId = req.candidate.id;
    const candidateCreatedAt = req.candidate.createdAt;
    const isAspirant = req.isAspirant;
    
    const audienceType = isAspirant ? 'all-aspirants' : 'all-students';
    const Model = isAspirant ? Aspirant : Student;
    const fkField = isAspirant ? 'AspirantId' : 'StudentId';
    
    let unreadCount = 0;

    // 1. Get broadcast notifications for this audience type created after candidate registration
    const broadcasts = await Notification.findAll({
      where: {
        targetAudience: audienceType,
        createdAt: { [Op.gte]: candidateCreatedAt },
      },
      raw: true,
    });

    // 2. Get notifications linked to this user via UserNotification
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

    const joinedNotifications = (userWithNotifications?.Notifications || []).filter(
      n => new Date(n.createdAt) >= new Date(candidateCreatedAt)
    );
    const joinedIds = new Set(joinedNotifications.map(n => n.id));

    // 3. Count unread broadcasts (not yet in joined set)
    const unseenBroadcasts = broadcasts.filter(b => !joinedIds.has(b.id));
    unreadCount += unseenBroadcasts.length;

    // 4. Count unread joined notifications (seen = false)
    const unreadJoined = joinedNotifications.filter(n => !n.UserNotification?.seen);
    unreadCount += unreadJoined.length;

    res.locals.unreadNotificationCount = unreadCount;
  } catch (error) {
    console.error("Error counting unread notifications:", error);
    res.locals.unreadNotificationCount = 0;
  }
  next();
};
