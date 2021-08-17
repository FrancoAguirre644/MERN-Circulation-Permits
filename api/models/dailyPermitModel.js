const mongoose = require('mongoose')

const dailyPermitSchema = new mongoose.Schema({
    person: {
        type: mongoose.Types.ObjectId,
        ref: 'person',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'site',
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'site',
        required: true
    },
    reason: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('dailyPermits', dailyPermitSchema)