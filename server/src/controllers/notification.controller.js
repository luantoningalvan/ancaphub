const Notification = require('../models/NotificationModel');

const getAll = async (req, res) => {
  const notifications = await Notification.find({
    receiver: request.user.id
  })
    .sort({ created_at: 'desc' })
    .populate("sender", "username avatar _id");
  response.send({
    notifications,
    notReadCount: notifications.filter((n) => { return n.read_by.length == 0 || n.read_by.includes({ readerId: request.user.id }) }).length
  });
};


const markAllAsRead = async (req, res) => {
  const notifications = await Notification.updateMany(
    { receiver: request.user.id },
    { $push: { read_by: { readerId: request.user.id } } }
  )
    .sort({ created_at: 'desc' })
    .populate("sender", "username avatar _id");
  response.send(notifications);
};

module.exports = { getAll, markAllAsRead }
