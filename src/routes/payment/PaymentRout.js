const express = require("express");
const paymentRoute = express.Router();
const PaymentController = require("../../controller/payment/PaymentController");
const paymentController = new PaymentController();

// paymentRoute.post("/makepayment", paymentController.makePayment);
paymentRoute.get("/allpayments", paymentController.getPayments);

// paymentRoute.put("/payment/:_id", paymentController.updatePayment);


module.exports = paymentRoute;
