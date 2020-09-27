const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MealsSchema = mongoose.model('Meal', new Schema({
    name: String,
    desc: String, 
}))

module.exports = MealsSchema