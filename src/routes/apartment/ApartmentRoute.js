const express = require("express");
const apartmentRoute = express.Router();
const ApartmentController = require("../../controller/apartment/ApartmentController");
const apartmentController = new ApartmentController();

apartmentRoute.post("/addapartment", apartmentController.createApartment);
apartmentRoute.get("/allapartment", apartmentController.getAllApartments);

apartmentRoute.put("/updateapart/:_id", apartmentController.updateApartment);
apartmentRoute.delete("/deleteaprt/:_id", apartmentController.deleteApartment);



module.exports = apartmentRoute;
