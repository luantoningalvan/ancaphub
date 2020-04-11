const Notification = require('../models/NotificationModel');

const getManyNotifications = async ({ filter, limit, skip }, user) => {
  try {
    const notifications = await Notification
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ created_at: 'desc' })
      .populate("sender", "name username avatar _id isVerified")

    const notReadCount = notifications.filter((n) => { 
      return n.read_by.length == 0 || n.read_by.includes({ readerId: user.id }) 
    }).length

    return {
      notifications,
      notReadCount
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateMany = async ({target, operation}) => {
  try {
    return await Notification.updateMany(target, operation)
      .sort({ created_at: 'desc' })
      .populate("sender", "username avatar _id isVerified");
  } catch (e) {
    throw new Error(e.message)
  }
}

const createNotification = async ({ type, receiver, sender, data }) => {
  try {
    const notify = new Notification({
      type,
      receiver,
      sender,
      data,
    });

    return await notify.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { createNotification, getManyNotifications, updateMany }