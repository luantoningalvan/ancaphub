const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/NotificationModel');

// @route 	GET api/notifications
// @desc 	  Retorna todas notificações do usuário logado
// @access 	Public

router.get('/', auth, async (request, response) => {
  const notifications = await Notification.find({
    receiver: request.user.id
  })
    .sort({ created_at: 'desc' })
    .populate("sender", "name avatar _id");
  response.send({
    notifications,
    notReadCount: notifications.filter((n) => { return n.read_by.length == 0 || n.read_by.includes({ readerId: request.user.id }) }).length
  });
});


// @route 	PUT api/notifications
// @desc 	  Marca todas as notificações como lidas
// @access 	Public

router.put('/', auth, async (request, response) => {
  const notifications = await Notification.updateMany(
    { receiver: request.user.id },
    { $push: { read_by: { readerId: request.user.id } } }
  )
    .sort({ created_at: 'desc' })
    .populate("sender", "name avatar _id");
  response.send(notifications);
});

module.exports = router;
