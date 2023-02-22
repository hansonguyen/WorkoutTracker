const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// GET all exercises
const getAllExercises = async (req, res) => {
    const exercises = await Exercise.find({}).sort({ createdAt: -1 })

    res.status(200).json(exercises)
}
// GET one exercise
const getExercise = async (req, res) => {
    const { id } = req.params

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const exercise = await Exercise.findById(id)

    if (!exercise) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    res.status(200).json(exercise)
}

// POST exercise to database
const createExercise = async (req, res) => {
    const { name, description, muscleGroups } = req.body
    try {
        const exercise = await Exercise.create({
            name,
            description,
            muscleGroups
        })
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json(error)
    }
}

// DELETE an exercise
const deleteExercise = async (req, res) => {
    const { id } = req.params

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const exercise = await Exercise.findOneAndDelete({ _id: id })

    if (!exercise) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    res.status(200).json(exercise)
}

// PATCH an exericse
const updateExercise = async (req, res) => {
    const { id } = req.params

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const exercise = await Exercise.findByIdAndUpdate(
        { _id: id },
        { ...req.body }
    )

    if (!exercise) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    res.status(200).json(exercise)
}

module.exports = {
    createExercise,
    getAllExercises,
    getExercise,
    deleteExercise,
    updateExercise
}
