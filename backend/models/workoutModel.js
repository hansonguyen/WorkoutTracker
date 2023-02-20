const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        exercises: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Workout', workoutSchema)
