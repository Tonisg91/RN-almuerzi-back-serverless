const router = require('express').Router()
const bcrypt = require('bcrypt')
const Users = require('../models/Users.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../auth')

const salt = 10
const signToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24 * 365
    })
}

router.post('/signup', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.send('Email y contraseña son necesarios')
    }
    const passwordHash = bcrypt.hashSync(password, salt)
    Users.findOne({ email }, (err, foundUser) => {
        if (err) return res.send('Error al crear el usuario.')
        if (foundUser) return res.send('Ya existe un usuario con ese email.')

        Users.create({
            email,
            passwordHash
        }).then(() => res.send('Usuario creado con éxito.'))
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son necesarios' })
        }

        const foundClient = await Users.findOne({email})
        if (!foundClient) return res.status(400).json({message: 'El usuario no existe'})

        const pwdMatch = bcrypt.compareSync(password, foundClient.passwordHash)
        if (!pwdMatch) return res.status(400).json({message: 'La contraseña no coincide'})

        const token = signToken(foundClient._id)
        return res.send({ token })
    } catch (error) {
        return res.status(500).json({message: 'Error al iniciar sesion.'})
    }
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router