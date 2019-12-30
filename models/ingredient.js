const mongoose = require("mongoose");
const moment = require('moment');
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true
});
const db = mongoose.connection;

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: {
    type: Number,
    default: 0
  },
  qunatityType: String,
  expiration: Date,
  photo: String,
});

ingredientSchema.methods.isAboutToExpire = function() {
  let todaysDate = moment();
  let diff = todaysDate.diff(this.expiration, 'days');


  if (diff > 0) {
    return "This is expired!";
  } else if (diff === -2) {
    return "This will expire in 2 days";
  } else if (diff === -1) {
    return "This ingredient will expire tomorrow";
  } else if (diff === 0) {
    return "This ingredient expires today";
  } else {
    return "You're good";
  }
}

const Ingredient = new mongoose.model('Ingredient', ingredientSchema);

const banana = new Ingredient({
  name: 'Banana',
  quantity: 3,
  qunatityType: 'weight',
  expiration: moment('2019-12-30')
});

const response = banana.isAboutToExpire();

console.log(response);
