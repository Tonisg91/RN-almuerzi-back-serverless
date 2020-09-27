const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.model('User', new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email obligatorio"],
        match: [/^\S+@\S+\.\S+$/, "Dirección de correo inválida"],
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: [true, "Contraseña obligatoria"]
    },
}))

module.exports = UserSchema