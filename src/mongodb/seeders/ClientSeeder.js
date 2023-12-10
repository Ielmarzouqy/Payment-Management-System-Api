const ClientRepo = require('../../repository/ClientRepo');

// const { exist } = require('joi');
class ClientSeeder {
  constructor() {
    this.clientRepo = new ClientRepo();
  }

  seed = async () => {
    try {
      const client = {
        fullname: 'Ima Elma',
        email: 'Elma@gmail.com',
        phone: '234564',
        apartment: '6574e7c77a92ed92d2c0ee33',
       
      };

      await this.clientRepo.create(client);
      console.log('apartment seeded successfully.');
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ClientSeeder;
