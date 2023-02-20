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
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// POST new workout
const createWorkout = async (req, res) => {
    const { name, exercises } = req.body

    try {
        const workout = await Workout.create({
            name,
            exercises
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json(error)
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// DELETE an exercise from a workout
const removeExercise = async (req, res) => {
    const { workoutid, exerciseid } = req.params

    if (!mongoose.Types.ObjectId.isValid(exerciseid)) {
        return res.status(404).json({ error: 'No such exercise' })
    } else if (!mongoose.Types.ObjectId.isValid(workoutid)) {
        return res.status(404).json({ error: 'No such workout' })
    } else {
        const exercise = await Exercise.findById(exerciseid)
        if (!exercise) {
            return res.status(404).json({ error: 'No such exercise' })
        }
    }

    try {
        const workout = await Workout.findById(workoutid)
        workout.exercises = workout.exercises.filter(
            (exercise) => exercise != exerciseid
        )
        await workout.save()
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({ error: 'No such workout' })
    }
}

// PATCH a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// PATCH exercise to workout
const addExercise = async (req, res) => {
    const { workoutid, exerciseid } = req.params

    if (!mongoose.Types.ObjectId.isValid(exerciseid)) {
        return res.status(404).json({ error: 'No such exercise' })
    } else if (!mongoose.Types.ObjectId.isValid(workoutid)) {
        return res.status(404).json({ error: 'No such workout' })
    } else {
        const exercise = await Exercise.findById(exerciseid)
        if (!exercise) {
            return res.status(404).json({ error: 'No such exercise' })
        }
    }

    try {
        const workout = await Workout.findById(workoutid)
        workout.exercises.push(exerciseid)
        await workout.save()
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({ error: 'No such workout' })
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
