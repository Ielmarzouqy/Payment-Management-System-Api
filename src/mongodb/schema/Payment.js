const { Schema, model, models } = require("../mongoose");

const paymentSchema = Schema({
    apartment:{
        ref:"Apartment",
        type : Schema.Types.ObjectId,
    },
    client:{
        ref: "Client",
        type : Schema.Types.ObjectId,
    },
    amount:{
        type: Number,
   
    },  
    month:{
        type : String, 
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
      },
   
    },
    {
        timestamps:true,
    
});

const Payment = models.Payment || model("Payment", paymentSchema);

module.exports = Payment;