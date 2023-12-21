const UserRepository = require('../../repository/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }


  register = async (req, res) => {
      const {
        userName,
        email,
        password,
        passwordConfirmation,
      } = req.body;
      if (!userName || !email || !password || !passwordConfirmation ) {
        res.status(404).json({ message: 'add all  information' });
      }
      if (password !== passwordConfirmation) {
        res
          .status(400)
          .json({ message: 'Password and password confirmation do not match' });
      }
      try {
        const hashPwd = await bcrypt.hash(password, 10);
        const user  = {
          userName,
          email,
          password: hashPwd,
          passwordConfirmation : hashPwd,
  
        };
        const   userCreated = await this.userRepository.create(user);

        return  res.status(200).json({ message:"user created :" , userCreated});
      } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message });

      }   
  };


  login = async (data, res) => {
     const {email, password} = data.body
    const user = await this.userRepository.findByEmail({email});
    console.log("user   ", user)
    if (!user) {
      const error = new Error("Email does not exist");
      error.status = 404;

      throw error;
    }

    // const isPasswordValid = await this.comparePassword(
    //   data.password,
    //   user.password
    // );
    // if (!isPasswordValid) {
    //   const error = new Error("Password is incorrect");
    //   error.status = 401;

    //   throw error;
    // }
    if (password !== user.password) {
        res
          .status(400)
          .json({ message: 'Password and password confirmation do not match' });
      }

      return  res.status(200).json({message:'you are logged in ', user})

  };


}

module.exports = AuthController;
