const moongose = require('mongoose')

const profileSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = moongose.model('Profiles', profileSchema)