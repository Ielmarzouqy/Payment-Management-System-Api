// const { exist } = require('joi');
const PaymentRepo = require('../../repository/PaymentRepo');
class PaymentSeeder {
  constructor() {
    this.paymentRepo = new PaymentRepo();
  }

  seed = async () => {
    try {
      const data = {
        apartment: '6574e7c77a92ed92d2c0ee33',
        client: '6574ea8034619ecc0d8f51d5',

        amount: '434',
        month : 'December'
      };
      
      await this.paymentRepo.create(data);
      console.log('payment seeded successfully.');
    
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = PaymentSeeder;
