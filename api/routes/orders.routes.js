const router = require('express').Router()
const Orders = require('../models/Orders.model')
const isAuthenticated = require('../auth/index')


router.get('/', async (req, res) => {
    const orders = await Orders.find()
    return res.status(200).json(orders)
})

router.get('/:id', async (req, res) => {
    const order = Orders.findById(req.params.id)
    if (order) return res.status(200).json(order)
    return res.status(400).json({ message: 'Order not found' })
})

router.post('/', isAuthenticated, async (req, res) => {
    const { _id } = req.user
    const newOrder = await Orders.create({...req.body, user_id: _id})
    return res.status(201).json(newOrder)
})

router.put('/:id', isAuthenticated, async (req, res) => {
    await Orders.findOneAndUpdate(req.params.id, req.body)
    res.sendStatus(204)
})

router.delete('/:id', isAuthenticated, async (req, res) => {
    await Orders.findOneAndDelete(req.params.id)
    res.sendStatus(204)
})

module.exports = router