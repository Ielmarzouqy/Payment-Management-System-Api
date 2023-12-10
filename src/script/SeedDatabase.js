const ApartmentSeeder = require('../mongodb/seeders/ApartmentSeeder');
const ClientSeeder = require('../mongodb/seeders/ClientSeeder');

const PaymentSeeder = require("../mongodb/seeders/PaymentSeeder");

const apartmentSeeder = new ApartmentSeeder();
const clientSeeder = new ClientSeeder();
const paymentSeeder = new PaymentSeeder();

const seedDatabase = async () => {
  try {
   
    await apartmentSeeder.seed();
    await clientSeeder.seed();
    await paymentSeeder.seed();
    // process.exit(0);
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

seedDatabase();
