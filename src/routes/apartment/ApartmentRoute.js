const express = require("express");
const apartmentRoute = express.Router();
const ApartmentController = require("../../controller/apartment/ApartmentController");
const apartmentController = new ApartmentController();

// apartmentRoute.post("/addapartment", apartmentController.addApartment);
apartmentRoute.get("/allapartment", apartmentController.getAllApartments);

// apartmentRoute.put("/payment/:_id", paymentController.updatePayment);


module.exports = apartmentRoute;
