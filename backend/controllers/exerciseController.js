const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// GET all exercises
const getAllExercises = async (req, res) => {
    const user_id = req.user._id
    const exercises = await Exercise.find({ user_id }).sort({ createdAt: -1 })

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

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (muscleGroups.length == 0) {
        emptyFields.push('muscleGroups')
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: 'Please fill in required fields', emptyFields })
    }

    try {
        const user_id = req.user._id
        const exercise = await Exercise.create({
            name,
            description,
            muscleGroups,
            user_id
        })
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({ error: error.message })
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
    const { name, description, muscleGroups } = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (muscleGroups.length == 0) {
        emptyFields.push('muscleGroups')
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: 'Please fill in required fields', emptyFields })
    }

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const exercise = await Exercise.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { returnOriginal: false }
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
