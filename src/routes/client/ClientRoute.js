const express = require("express");
const clientRoute = express.Router();
const ClientController = require("../../controller/client/ClientController");
const clientController = new ClientController();

clientRoute.post("/addclient", clientController.createClient);
clientRoute.get("/allclients", clientController.getAllClients);

clientRoute.put("/updateclt/:_id", clientController.updateClient);


module.exports = clientRoute;
