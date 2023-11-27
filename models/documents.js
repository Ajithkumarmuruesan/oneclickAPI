const mongoose = require('mongoose');

const Document = mongoose.model('Documents_sample', {
  businessname: String,
  businesstype: String,
  country: String,
  state: String,
  city: String,
  postalcode: String,
  address: String,
  mobile: String,
  currentaddress: String,
  businessdesc: String,
  businessmail: String,
  businessweb: String,
  image: String
});

module.exports = Document;