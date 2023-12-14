const Client = require("../mongodb/schema/Client");
const Payment = require("../mongodb/schema/Payment");
const mongoose = require('../mongodb/mongoose'); // Add this line to import mongoose
// mongoose.set("strictQuery", true);

// const mongoose = new mongoose();
const BaseRepo = require("./BaseRepo");

class ClientRepo extends BaseRepo {
  constructor() {
    super(Client);
  }
  
  create = async (data) => {
    // const { foods, user } = data;

    console.log('repo  ', data);
    try {
      return await this.model.insertMany(data);
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
    } catch (error) {
      throw new Error(error);
    }
  }; 
  
  // getReceiptClient =  async (conditions) => {
  //   try {
  //     // const month = await this.model.findOne({ _id: id });

  //     const payment = await Payment.findById(conditions).populate("client").populate("apartment").lean();

  //     console.log("payment", payment)

  //     return {month,payment}
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }; 
  


}

module.exports = ClientRepo;