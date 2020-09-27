const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdersSchema = mongoose.model('Order', new Schema({
    meal_id: {
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}))

module.exports = OrdersSchema