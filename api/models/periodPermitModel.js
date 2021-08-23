const mongoose = require('mongoose')
const bson = require('bson')

const periodPermitSchema = new mongoose.Schema({
    person: {
        type: mongoose.Types.ObjectId,
        ref: 'Persons',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'Sites',
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'Sites',
        required: true
    },
    vehicle: {
        type: mongoose.Types.ObjectId,
        ref: 'Vehicles',
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    vacations: {
        type: Boolean,
        required: true
    },
    qr: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('periodPermits', periodPermitSchema)