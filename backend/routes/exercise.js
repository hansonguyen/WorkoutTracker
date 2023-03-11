const express = require('express')
const {
    createExercise,
    getAllExercises,
    getExercise,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require auth for all exercise routes
router.use(requireAuth)

// GET all exercises
router.get('/', getAllExercises)

// GET one exercise
router.get('/:id', getExercise)

// POST exercise to database
router.post('/', createExercise)

// DELETE an exercise
router.delete('/:id', deleteExercise)

// PATCH an exercise
router.patch('/:id', updateExercise)

module.exports = router
