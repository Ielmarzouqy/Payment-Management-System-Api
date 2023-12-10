const ApartmentRepo = require('../../repository/ApartmentRepo');

// const { exist } = require('joi');
class ApartmentSeeder {
  constructor() {
    this.apartmentrepo = new ApartmentRepo();
  }

  seed = async () => {
    try {
      const apartment = {
        name: 'Apt 122',
        description: 'description of aprt',
        price: '154',
        room: '2',
        image: 'image',
        location: 'location',
        number: '8',
      };

      await this.apartmentrepo.create(apartment);
      console.log('apartment seeded successfully.');
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ApartmentSeeder;
