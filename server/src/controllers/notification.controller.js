const Notification = require('../models/NotificationModel');

const getAll = async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.user.id
  })
    .sort({ created_at: 'desc' })
    .populate("sender", "username avatar _id");
  res.send({
    notifications,
    notReadCount: notifications.filter((n) => { return n.read_by.length == 0 || n.read_by.includes({ readerId: req.user.id }) }).length
  });
};


const markAllAsRead = async (req, res) => {
  const notifications = await Notification.updateMany(
    { receiver: req.user.id },
    { $push: { read_by: { readerId: req.user.id } } }
  )
    .sort({ created_at: 'desc' })
    .populate("sender", "username avatar _id");
  res.send(notifications);
};

module.exports = { getAll, markAllAsRead }
