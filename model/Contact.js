const mongoose = require('mongoose')
/*
	Contact Schema
*/
const ContactSchema = mongoose.Schema = {
	name: { type: String, required:true },
  lastName: { type: String, required:true },
  company: String,
  phoneNumber: String,
  email: { type: String, required:true }
}

module.exports = mongoose.model("Contact", ContactSchema)