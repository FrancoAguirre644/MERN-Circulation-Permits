const moongose = require('mongoose')

const vehicleSchema = new moongose.Schema({
    patent: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        default: 'user'
    },
    year: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = moongose.model('Vehicles', vehicleSchema)