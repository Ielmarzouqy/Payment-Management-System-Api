const UserRepository = require('../../repository/UserRepository');

// const { exist } = require('joi');
class UserSeeder {
  constructor() {
    this.userRepository = new UserRepository();
  }

  seed = async () => {
    try {
      const user = {
        userName: "mi",
        email: "mi@gmail.com",
        password: "123",
        passwordConfirmation: "123"
        
      }

      await this.userRepository.create(user);
      console.log('user seeded successfully.');
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserSeeder;
