
const Payment = require("../mongodb/schema/Payment");
const BaseRepo = require("./BaseRepo");

class PaymentRepo extends BaseRepo {
  constructor() {
    super(Payment);
  }
  
  create = async (data) => {
    // const { foods, user } = data;

    console.log('repo  ', data);
    try {
      return await this.model.insertMany(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  displayPayments = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {
      return await this.model.find(query).populate("client").populate("apartment").lean();
      
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = PaymentRepo;

// const BaseRepository = require('./BaseRepository');
// const User = require('../databases/mongodb/models/User');
// const Food = require('../databases/mongodb/models/Menu');

// const Order = require('../databases/mongodb/models/Order');
// const Menu = require('../databases/mongodb/models/Menu');

// class OrderRepository extends BaseRepository {
//   constructor() {
//     super(Order);
//     this.foodModel = Food;
//     this.userModel = User;

//   }

//   create = async (data) => {
//     const { foods, user } = data;

//     console.log('repo  ', data);
//     try {
//       const foodns = await this.foodModel.find({ _id: { $in: foods } });
//       const userns = await this.userModel.findById(user);

//       const orders = foodns.map((foodn) => ({
//         food: foodn,
//         price: foodn.price,
//         user: userns,
//       }));

//       return await this.model.insertMany(orders);
//     } catch (error) {
//       throw new Error(error);
//     }
//   };


// update = async (orderId, orderUpdate) => {
//   try {
//     const updatedOrder = await this.model.findByIdAndUpdate(
//       orderId,
//       { $set: orderUpdate },
//       { new: true }
//     );
//     console.log('orderUpdate repo ', orderUpdate) /
//       console.log('orderUpdate ', updatedOrder);

//     return updatedOrder;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// getOrders = async () => {
//   try {
//     const orders = await this.model.find({ status: 'pending' }).populate("user").lean(); 
    
//     // Fetch details for each food item
//     const populatedOrders = await Promise.all(orders.map(async (order) => {
//       const populatedFood = await this.populateFoodDetails(order.food);
//       console.log("populatedFood", populatedFood)
//       return { ...order, food: populatedFood };
//     }));

//     return populatedOrders;
//   } catch (error) {
//     throw error;
//   }
// };

// populateFoodDetails = async (foodIds) => {
//   try {
//     const foods = await Menu.find({ _id: { $in: foodIds } }).populate("restaurant").lean(); 
//     return foods;
//   } catch (error) {
//     throw error;
//   }
// };

// }
// module.exports = OrderRepository;
