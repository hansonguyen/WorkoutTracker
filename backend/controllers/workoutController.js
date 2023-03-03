const Workout = require('../models/workoutModel')
const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

// GET all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

// GET one workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout does not exist...' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'Workout does not exist...' })
    }
    res.status(200).json(workout)
}

// POST new workout
const createWorkout = async (req, res) => {
    const { name, description, exercises } = req.body
    const emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: 'Please fill in all required fields', emptyFields })
    }

    try {
        const workout = await Workout.create({
            name,
            description,
            exercises
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    res.status(200).json(workout)
}

// DELETE an exercise from a workout
const removeExercise = async (req, res) => {
    const { workoutid, exerciseid } = req.params

    // Validatation
    if (!mongoose.Types.ObjectId.isValid(workoutid)) {
        return res.status(404).json({ error: 'Workout is not valid...' })
    }
    if (!mongoose.Types.ObjectId.isValid(exerciseid)) {
        return res.status(404).json({ error: 'Exercise is not valid...' })
    }
    const exercise = await Exercise.findById(exerciseid)
    if (!exercise) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    try {
        const workout = await Workout.findByIdAndUpdate(
            workoutid,
            { $pull: { exercises: { exercise_id: exerciseid } } },
            { new: true }
        )
        if (!workout) {
            return res.status(404).json({ error: 'Workout does not exist...' })
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({
            error: 'Could not remove exercise from workout...'
        })
    }
}

// PATCH a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }

    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnOriginal: false }
    )

    if (!workout) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    res.status(200).json(workout)
}

// PATCH exercise to workout
const addExercise = async (req, res) => {
    const { workoutid } = req.params
    const { exercise_id, sets, reps, load } = req.body

    // Validatation
    if (!mongoose.Types.ObjectId.isValid(workoutid)) {
        return res.status(404).json({ error: 'Workout is not valid...' })
    }
    if (!mongoose.Types.ObjectId.isValid(exercise_id)) {
        return res.status(404).json({ error: 'Exercise is not valid...' })
    }
    const exercise = await Exercise.findById(exercise_id)
    if (!exercise) {
        return res.status(404).json({ error: 'Exercise does not exist...' })
    }
    if (!Number.isInteger(sets) || sets <= 0) {
        return res
            .status(400)
            .json({ error: 'Sets must be a positive integer greater than 0' })
    }
    if (!Number.isInteger(reps) || reps <= 0) {
        return res
            .status(400)
            .json({ error: 'Reps must be a positive integer greater than 0' })
    }
    if (!Number.isInteger(load) || load < 0) {
        return res
            .status(400)
            .json({ error: 'Load must be a positive integer' })
    }

    try {
        const workout = await Workout.findById(workoutid)
        if (!workout) {
            return res.status(404).json({ error: 'Workout does not exist...' })
        }
        const newExercise = { exercise_id, sets, reps, load }
        workout.exercises.push(newExercise)
        await workout.save()
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({ error: 'Could not add exercise to workout...' })
    }
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    addExercise,
    removeExercise
}
