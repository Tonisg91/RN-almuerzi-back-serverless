const router = require('express').Router()
const Meals = require('../models/Meals.model')


router.get('/', async (req, res) => {
    const meals = await Meals.find()
    res.status(200).json(meals)
})

router.get('/:id', async (req, res) => {
    const meal = await Meals.findById(req.params.id)
    if (meal) return res.status(200).json(meal)
    return res.status(400).json({message: 'Meal not found'})
})

router.post('/', async (req, res) => {
    const newMeal = await Meals.create(req.body)
    return res.status(201).json(newMeal)
})

router.put('/:id', async (req, res) => {
    await Meals.findOneAndUpdate(req.params.id, req.body)
    res.sendStatus(204)
})

router.delete('/:id', async (req, res) => {
    await Meals.findOneAndDelete(req.params.id)
    res.sendStatus(204)
})

module.exports = router