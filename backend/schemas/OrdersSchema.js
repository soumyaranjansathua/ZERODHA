const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        default: "BUY",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = { OrdersSchema };
