const Client = require("../mongodb/schema/Client");
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
      return await this.model.find(query).populate("apartment").lean();
      
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ClientRepo;