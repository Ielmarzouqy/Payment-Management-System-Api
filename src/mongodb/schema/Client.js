const { Schema, model, models } = require("../mongoose");

const clientSchema = Schema({
  fullname: {
    type: String,
    required: [true, "client name is required"],
  },
  email: {
    type: String,
    required: [true, "client email is required"],
  },
  phone: {
    type: Number,
    required: [true, "client phone is required"],
  },
  apartment: {
    ref: "Apartment",
    type : Schema.Types.ObjectId,
  },
  startDate: {
    type: Date,
    default:null
  },
  endDate: {
    type: Date,
    default: null,
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

const Client = models.Client || model("Client", clientSchema);

module.exports = Client;