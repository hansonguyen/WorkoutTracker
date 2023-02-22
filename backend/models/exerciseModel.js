const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        muscleGroups: {
            type: Array,
            required: true
        },
        // user_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Exercise', exerciseSchema)
