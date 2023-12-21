// const jwt = require('jsonwebtoken')
// const asyncHandler = require("express-async-handler");
// require('dotenv').config()
// module.exports = (req,res,next)=>{
//   console.log('fffffffffffff');
//     let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     console.log(token);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401).json({message:"user is not authorized"});
//         throw new Error("User is not authorized");
//       }
//       req.user = decoded.user;
//       next();
//     });
//     if (!token) {
//       res.status(401);
//       throw new Error("User is not authorized or token is missing");
//     }
//   }
    
// }