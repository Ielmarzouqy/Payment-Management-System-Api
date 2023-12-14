const express = require("express");
const clientRoute = express.Router();
const ClientController = require("../../controller/client/ClientController");
const clientController = new ClientController();

clientRoute.post("/addclient", clientController.createClient);
clientRoute.get("/allclients", clientController.getAllClients);
clientRoute.get("/client/:_id", clientController.getClient);
// clientRoute.get("/client/:_id/:month", clientController.getReceipt);



clientRoute.put("/updateclt/:_id", clientController.updateClient);
clientRoute.delete("/deleteclt/:_id", clientController.deleteClient);



module.exports = clientRoute;
