const mongoose = require('mongoose');
const Schema = mongoose.Schema;

NotificationSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  data: Object,
  /* 
  Lista de types: {
    approved_item: Item aprovado pela curadoria
    rated_item: Item avaliado 
  }
  
  */
  type: String,
  read_by: [
    {
      readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      read_at: { type: Date, default: Date.now }
    }
  ],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
