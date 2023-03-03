const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        exercises: [
            {
                exercise_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Exercise',
                    required: true
                },
                sets: {
                    type: Number,
                    required: true
                },
                reps: {
                    type: Number,
                    required: true
                },
                load: {
                    type: Number,
                    required: true
                }
            }
        ],
        // user_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Workout', workoutSchema)
