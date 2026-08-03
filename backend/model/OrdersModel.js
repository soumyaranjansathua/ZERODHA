const {model} = require('mongoose');
const {OrdersSchema} = require('../schemas/ordersSchema');

const OrdersModel = model('Orders', OrdersSchema);

module.exports = {OrdersModel};