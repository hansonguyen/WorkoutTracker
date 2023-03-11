const express = require('express')
const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    addExercise,
    removeExercise
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getAllWorkouts)

// GET one workout
router.get('/:id', getWorkout)

// POST new workout
router.post('/', createWorkout)

// POST exercise to workout
router.post('/:workoutid', addExercise)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// DELETE an exercise from a workout
router.delete('/:workoutid/:exerciseid', removeExercise)

// PATCH a workout
router.patch('/:id', updateWorkout)

module.exports = router
