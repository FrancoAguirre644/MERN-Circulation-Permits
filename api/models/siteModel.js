const moongose = require('mongoose')

const siteSchema = new moongose.Schema({
    site: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = moongose.model('Sites', siteSchema)