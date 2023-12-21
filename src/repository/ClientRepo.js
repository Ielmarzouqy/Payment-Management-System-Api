const Client = require("../mongodb/schema/Client");
const Payment = require("../mongodb/schema/Payment");
const Apartment = require("../mongodb/schema/Apartment");

const mongoose = require('../mongodb/mongoose'); // Add this line to import mongoose
// mongoose.set("strictQuery", true);

// const mongoose = new mongoose();
const BaseRepo = require("./BaseRepo");

class ClientRepo extends BaseRepo {
  constructor() {
    super(Client);
  }
  
  create = async (data) => {
    const { apartment } = data;
    const aprtUpdate = {isAvailable:false}
    console.log('repo  ', data);
    console.log('repo statuuuuus  ', apartment);

    try {

      const client =  await this.model.create(data);
      const status = await Apartment.findByIdAndUpdate(apartment, aprtUpdate);

      return client, status;
    } catch (error) {
      throw new Error(error);
    }
  };


  displayClients = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {

      const result = await this.model.aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'payments', 
            localField: '_id', 
            foreignField: 'client', 
            as: 'payments',
          },
        },
        {
          $lookup: {
            from: 'apartments', 
            localField: 'apartment',
            foreignField: '_id', 
            as: 'apartment',
          },
        },
        {
          $project: {
            _id: 0,
            client: {
              $mergeObjects: [
                '$$ROOT',
                {
                  payments: '$payments',
                  apartment: { $arrayElemAt: ['$apartment', 0] },
                },
              ],
            },
          },
        },
      ]);
  
      return result.map(item => item.client);
    } catch (error) {
      throw new Error(error);
    }
  };




  getOneClient =  async (conditions) => {
    try {
      const client = await this.model.findById(conditions).populate("apartment").lean();

      const payment = await Payment.find({client: client._id}).populate("client").populate("apartment").lean();

      console.log("payment", payment)

      return {client,payment}
      // return {client}
    } catch (error) {
      throw new Error(error);
    }
  }; 
}

module.exports = ClientRepo;