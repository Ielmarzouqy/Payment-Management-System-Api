const ApartmentRepo = require('../../repository/ApartmentRepo');

class ApartmentController {
  constructor() {
    this.apartmentRepo = new ApartmentRepo();
  }
  getAllApartments = async (req, res) => {
    const  apartments = await this.apartmentRepo.findAll();
    console.log(apartments)
    res.status(200).json({ message:"all apartment" ,apartments:apartments});
  };
}

module.exports = ApartmentController;
