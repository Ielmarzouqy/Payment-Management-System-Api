// const ApartmentSeeder = require('../mongodb/seeders/ApartmentSeeder');
// const ClientSeeder = require('../mongodb/seeders/ClientSeeder');

// const PaymentSeeder = require("../mongodb/seeders/PaymentSeeder");
const UserSeeder = require('../mongodb/seeders/UserSeeder');

// const apartmentSeeder = new ApartmentSeeder();
// const clientSeeder = new ClientSeeder();
// const paymentSeeder = new PaymentSeeder();
const userSeeder = new UserSeeder();

const seedDatabase = async () => {
  try {
   
    // await apartmentSeeder.seed();
    // await clientSeeder.seed();
    // await paymentSeeder.seed();
    await userSeeder.seed()
    // process.exit(0);
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

seedDatabase();
