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
          passwordConfirmation,
  
        };
        const   userCreated = await this.userRepository.create(user);

        return  res.status(200).json({ message:"user created :" , userCreated});
      } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message });

      }
   
   
  };

}

module.exports = AuthController;
