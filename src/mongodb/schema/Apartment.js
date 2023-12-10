const { Schema, model, models } = require("../mongoose");

const apartmentSchema = Schema({
  name: {
    type: String,
    required: [true, "apartment name is required"],
  },
  description: {
    type: String,
    required: [true, "apartment description is required"],
  },
  price: {
    type: Number,
    required: [true, "apartment price is required"],
  },
  room:{
    type: Number,
  },
  image: {
    type: String,
    default: null,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    default: null,
  },
  number:{
    type: String,
    default:null
  },
 
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Apartment = models.Apartment || model("Apartment", apartmentSchema);

module.exports = Apartment;