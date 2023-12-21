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

  getApartment = async (req, res) => {

    const _id = req.params
    const  apartment = await this.apartmentRepo.findById(_id);
    console.log(apartment)
    res.status(200).json({ message:"GET apartment" ,apartment:apartment});
  };

  getAvailableApartments = async (req, res) => {
try {
 // const _id = req.params
 const  apartment = await this.apartmentRepo.findAvailableApartment();
 console.log(apartment)
   res.status(200).json({ message:"GET apartment" ,apartment:apartment});

}catch (error){
  res.status(500).json({message: error.message})
}
    };





  createApartment = async (req, res) => {
    const apartment = req.body
      const    apartmentC = await this.apartmentRepo.create(apartment);
    console.log(apartmentC)
    res.status(200).json({ message:"all apartment" ,apartment:apartmentC});
  };

  updateApartment = async (req, res) => {
    const _id = req.params;
    const apartment = req.body;
    console.log(_id, apartment)

    const  apartmentUp = await this.apartmentRepo.update(_id, apartment);
    console.log(apartmentUp)
    res.status(200).json({ message:"all apartment" ,apartment:apartmentUp});
  };

  deleteApartment = async (req, res) => {
    const _id = req.params;
    console.log(_id)

    const  apartmentDeleted = await this.apartmentRepo.forceDelete(_id);
    console.log(apartmentDeleted)
    res.status(200).json({ message:"Delete apartment successfuly" });
  };
}

module.exports = ApartmentController;
