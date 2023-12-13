const express = require("express");
const paymentRoute = express.Router();
const PaymentController = require("../../controller/payment/PaymentController");
const paymentController = new PaymentController();

paymentRoute.post("/makepayment", paymentController.makePayment);
paymentRoute.get("/allpayments", paymentController.getPayments);

paymentRoute.delete("/deletepay/:_id", paymentController.deletePayment);

paymentRoute.put("/updatepay/:_id", paymentController.updatePayment);
paymentRoute.get("/payment/:_id", paymentController.getPayment);

module.exports = paymentRoute;
