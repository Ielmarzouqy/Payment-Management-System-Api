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

  createApartment = async (req, res) => {
    const apartment = req.body
      const    apartmentC = await this.apartmentRepo.create(apartment);
    console.log(apartmentC)
    res.status(200).json({ message:"all apartment" ,apartment:apartmentC});
  };
}

module.exports = ApartmentController;
