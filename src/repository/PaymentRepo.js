
const Payment = require("../mongodb/schema/Payment");
const BaseRepo = require("./BaseRepo");

class PaymentRepo extends BaseRepo {
  constructor() {
    super(Payment);
  }
  
  create = async (data) => {
    // const { foods, user } = data;

    console.log('repo  ', data);
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  displayPayments = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {
      return await this.model.find(query).populate("client").populate("apartment").lean();
      
    } catch (error) {
      throw new Error(error);
    }
  };

  getReceipt =  async (conditions) => {
    try {
      const receipt = await this.model.findById(conditions).populate("apartment").populate("client").lean();


      console.log("payment", receipt)

      return {client,receipt}
    } catch (error) {
      throw new Error(error);
    }
  }; 

}

module.exports = PaymentRepo;


