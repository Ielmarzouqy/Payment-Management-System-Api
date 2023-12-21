const BaseRepo = require('./BaseRepo');
const User = require('../mongodb/schema/User');

class UserRepository extends BaseRepo {
  constructor() {
    super(User);
  }

  create = async (data) => {
    try {
      const user = await this.model.create(data);
      console.log(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  findOne = async (conditions) => {
    try {
      return await this.model.findOne(conditions);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  findByEmail = async (conditions) => {
    console.log(conditions)
    try {
      return await this.model.findOne(conditions);
    } catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = UserRepository;
