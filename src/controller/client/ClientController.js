const ClientRepo = require('../../repository/ClientRepo');

class ClientController {
  constructor() {
    this.clientRepo = new ClientRepo();
  }

//   registerOrder = async (req, res) => {
//     const { foods, user } = req.body;

//     try {
//       const result = await this.orderUseCase.executeOrder({
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

getAllClients = async (req, res) => {

    try {
      const result = await this.clientRepo.displayClients();
      console.log(result)

        return res.status(200).json({
          message: 'get all client successfuly',
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
}

module.exports = ClientController;
