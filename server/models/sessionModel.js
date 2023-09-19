const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 60 * 60 * 24, default: Date.now }, //60 * 60 * 24 = session expires after 24 hours (60 seconds is standard timing used, * 60 minutes, * 24 hours)
});
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
