const BaseRepo = require('./BaseRepo');
const Apartment = require('../mongodb/schema/Apartment');

class ApartmentRepo extends BaseRepo {
  constructor() {
    super(Apartment);
    // this.foodModel = Food;
    // this.userModel = User;

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

  findAvailableApartment = async ()=>{
    try {
      return await Apartment.find({ isAvailable: true });
    } catch (error) {
      throw new Error(error.message);
    }
  
  }


}
module.exports = ApartmentRepo;
