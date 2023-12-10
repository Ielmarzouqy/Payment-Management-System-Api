const express = require("express");
// const authRoutes = require("./auth/authRoutes");
// const deliveryRoutes = require("./delivery/deliveryRoutes");
const apartmentRoute = require("./apartment/ApartmentRoute");
const paymentRoute = require("./payment/PaymentRout");
const clientRoute = require("./client/ClientRoute");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use("/auth", authRoutes);
router.use("/payment", paymentRoute);
router.use("/client", clientRoute);
router.use("/apartment",apartmentRoute);


router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = router;
