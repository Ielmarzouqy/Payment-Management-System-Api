const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ApartmentRoute = require('./src/routes/apartment/ApartmentRoute');
// const roleRoute = require('../routes/roleRoute');
// const newRole = require('../objects/roleObj');


const connect = require('../payment-management-system-Api/src/config/database');
require('dotenv').config();

const cors = require('cors');



app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials : true,
  })
);

connect();

const bodyParse = require('body-parser');
const ClientRoute = require('./src/routes/client/ClientRoute');
const paymentRoute = require('./src/routes/payment/PaymentRout');
const userRoute = require('./src/routes/user/UserRoute');
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'hi minaa' });
});

// console.log("Role in app.js:", newRole);


app.use('/api/apartment', ApartmentRoute);
app.use('/api/client', ClientRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/user', userRoute);




// app.use('/api/roles', roleRoute);



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
