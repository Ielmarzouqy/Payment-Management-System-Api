const asyncHandler = require('express-async-handler');
const User = require('../../mongodb/schema/User');
// const Role = require('../models/roleModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const { getMailOptions } = require('../util/mailer');
const jwtMiddleware = require('../../middleware/JWTMiddleware');
const generateToken = require('../../util/generateToken');
require('dotenv').config();

const registerUser = asyncHandler(async (req, res) => {
  const {
    userName,
    email,
    password,
    passwordConfirmation,
    // role,
    // isEmailVerified,
  } = req.body;
  if (!userName || !email || !password || !passwordConfirmation ) {
    res.status(404).json({ message: 'add all the infos' });
  }
  if (password !== passwordConfirmation) {
    res
      .status(400)
      .json({ message: 'Password and password confirmation do not match' });
    return;
  }
  const hashPwd = await bcrypt.hash(password, 10);

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: 'user already exist' });
  }
  const newUser = new User({
    userName,
    email,
    password: hashPwd,
    passwordConfirmation,
    role,
    isEmailVerified,
  });

  await newUser.save();

  const accessToken = generateToken({ email: newUser.email });
  console.log(generateToken);

  const link = `http://localhost:5000/api/users/verify?token=${accessToken}`;

//   function verifyEmail(email, link) {
//     let transport = nodemailer.createTransport({
//       host: 'sandbox.smtp.mailtrap.io',
//       port: 2525,
//       auth: {
//         user: '2f0433f9c00cb7',
//         pass: '0a366ec0f2d833',
//       },
//     });

//     const mailOptions = {
//       from: 'vindication@enron.com',
//       to: email,
//       subject: 'Invoices due',
//       text: 'Dudes, we really need your money.',
//       html: ` <h2>Hey ${email}</h2>
//           <p>Here's the special magic link you requested:</p>
          
//           <a href=${link}>Verify Account</a>

//           <p>Please note that for added security this link becomes invalid after 45 minutes</p>
//           <p>Stay Jiggy</p>`,
//     };

//     transport.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   }

//   verifyEmail(req.body.email, link);
//   res.status(201).json({
//     message: 'User registered successfully',
//     user: {
//       userName: newUser.userName,
//       email: newUser.email,
//       password: newUser.password,
//     },
//   });
});



const verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(404).send('User not found');
    } else {
      user.isEmailVerified = true;
      await user.save();

      console.log('Email verified for user:', user);
      res.send('Email verified');
    }
  } catch (err) {
    console.error(err);
    res.status(401).send('Unauthorized');
  }
};

// $*******************************************************

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields are mandatory!' });
  }
  const user = await User.findOne({ email });
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    user.isEmailVerified == true &&
    user.role == "654396e38f77988a1b1b7122"

  ) {
    const accessToken = generateToken({ user: user.email });
    console.log(generateToken);
    console.log(user.role)

    res
      .status(200)
      .json({ message: 'you are loged in successfully', accessToken });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: 'loged out' });
});

// **************************************************************************

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken({ email: user.email });

    await user.save();

    const resetLink = `http://localhost:3000/Login/forget-password/reset-password?token=${token}`;
    sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

  function sendPasswordResetEmail(email, resetLink) {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '2f0433f9c00cb7',
        pass: '0a366ec0f2d833',
      },
    });

    const mailOptions = {
      from: 'your_email@example.com',
      to: email,
      subject: 'Password Reset Link',
      text: 'Here is your password reset link:',
      html: `<a href="${resetLink}">Reset Password</a>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Password reset email sent: ' + info.response);
      }
    });
  }
};

const resetPassword = async (req, res) => {
  const token = req.query.token;
  console.log(token);
  const { newPassword } = req.body;
  console.log(newPassword);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const email = decoded.email;
  console.log(email);
    const user = await User.findOne({ email });


    if (email !== user.email) {
      return res.status(400).json({ message: 'Invalid or expired email' });
    }

    const hachPassword = await bcrypt.hash(newPassword, 10);
    console.log(hachPassword);
    await User.findOneAndUpdate(
      { email },
      { password: hachPassword }
    );

    return res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès.',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
//   verifyEmail,
//   forgetPassword,
//   resetPassword,
  getUsers
};