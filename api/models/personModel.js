const moongose = require('mongoose')

const personSchema = new moongose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = moongose.model('Persons', personSchema)