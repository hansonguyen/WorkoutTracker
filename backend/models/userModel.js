const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static sign up method
userSchema.statics.signup = async function (name, email, password) {
    // Validation
    if (!name || !email || !password) {
        throw Error('Please fill all required fields')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user
}

// Static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Please fill all required fields')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('No account with that email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
