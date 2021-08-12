const Profiles = require('../models/profileModel')

const profileController = {
    createProfile: async (req, res) => {
        try {
            const { name } = req.body;

            const profile = await Profiles.findOne({ name: name })
            if (profile) return res.status(400).json({ msg: "The profile already exists." })

            const newProfile = new Profiles({ name })

            await newProfile.save()

            res.status(201).json({ msg: "Profile created successfully." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProfile: async (req, res) => {
        try {

            const { name } = req.body

            await Profiles.findOneAndUpdate({ _id: req.params.id }, { name })

            res.status(200).json({ msg: 'Profile updated successfully.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProfile: async (req, res) => {
        try {

            await Profiles.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Profile deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProfile: async (req, res) => {
        try {

            const profile = await Profiles.find({ _id: req.params.id })

            res.status(200).json(profile)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllProfiles: async (req, res) => {
        try {

            const profiles = await Profiles.find()

            res.status(200).json({ profiles })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = profileController