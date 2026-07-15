const { UserNotification, Notification, Sequelize } = require("../models");
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
    const fkField = isAspirant ? 'AspirantId' : 'StudentId';
    
    // 1. Count unread direct notifications
    const unreadJoined = await UserNotification.count({
      where: {
        [fkField]: candidateId,
        seen: false,
      },
    });

    // 2. Count unseen broadcast notifications
    const unseenBroadcastsCount = await Notification.count({
      where: {
        targetAudience: audienceType,
        createdAt: { [Op.gte]: candidateCreatedAt },
        id: {
          [Op.notIn]: Sequelize.literal(
            `(SELECT NotificationId FROM UserNotifications WHERE ${fkField} = '${candidateId}')`
          ),
        },
      },
    });

    res.locals.unreadNotificationCount = unreadJoined + unseenBroadcastsCount;
  } catch (error) {
    console.error("Error counting unread notifications:", error);
    res.locals.unreadNotificationCount = 0;
  }
  next();
};
