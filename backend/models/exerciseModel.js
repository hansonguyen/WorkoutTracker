const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        muscleGroups: {
            type: [String],
            required: true,
            validate: {
                validator: (arr) => arr.length > 0
            }
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Exercise', exerciseSchema)
