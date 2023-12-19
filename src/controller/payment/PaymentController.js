const PaymentRepo = require('../../repository/PaymentRepo');

class PaymentController {
  constructor() {
    this.paymentRepo = new PaymentRepo();
  }

//   registerOrder = async (req, res) => {
//     const { foods, user } = req.body;

//     try {
//       const result = await this.paymentRepo.executeOrder({
//         foods,
//         user,
//       });

//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

//   handleNewOrder = async (socket, data) => {
//     const { foods, user } = data;

//     try {
//       const result = await this.orderUseCase.executeOrder({
//         foods,
//         user,
//       });

//       socket.broadcast.emit('notification', result.ordern);
//     } catch (error) {
//       console.error(error);
//       socket.emit('notification', { error: error });
//     }
//   };

//   confirmationOrder = async (req, res) => {
//     const { _id } = req.params;

//     console.log(_id);
//     try {
//       const result = await this.orderUseCase.confirmOrder(_id);

//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

getPayments = async (req, res) => {

    try {
      const result = await this.paymentRepo.displayPayments();
      console.log(result)

        return res.status(200).json({
          message: ' get all Payments ',
          result:result
        });
   
    //   res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message });
    }
  };

  getPayment = async (req, res) => {

    const _id = req.params
    try {
      const result = await this.paymentRepo.findOne(_id);
      console.log(result)

        return res.status(200).json({
          message: ' get all Payments ',
          result:result
        });
   
    //   res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message });
    }
  };

  makePayment = async (req, res) => {
      const paymentCreate = req.body;
      console.log(paymentCreate)
    try {
      const payment = await this.paymentRepo.create(paymentCreate);
      console.log(payment)

        return res.status(200).json({
          message: ' make Payment successfuly',
          result:payment
        });
   
    //   res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message });
    }
  };

  updatePayment = async (req, res)=>{
    const _id = req.params;
    const paymentUpdated = req.body;

    try{

      const payment = await this.paymentRepo.update(_id, paymentUpdated)
console.log( "payment edit", payment)
      return res.status(200).json({
        message:"payment updated successfuly",
        data:payment
      })
    }catch(error){
      console.error(error);
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message });

    }

  }

  deletePayment = async (req, res)=>{
    
    const _id = req.params
          console.log(_id)
      try{

        const paymentDeleted = await this.paymentRepo.forceDelete(_id);

        return res.status(200).json({
          message: ' delete Payment successfuly',
        });
      }catch (error){
        console.error(error);
        res
          .status(500)
          .json({ error: 'Internal Server Error', message: error.message });
      }
      }

      getReceiptMonth = async (req, res) => {

        const _id = req.params

        try {
          const result = await this.paymentRepo.getReceipt(_id,month);
          console.log(result)

            return res.status(200).json({
              message: ' get all Payments ',
              result
            });
      
        //   res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: 'Internal Server Error', message: error.message });
        }
      };
    }

module.exports = PaymentController;
