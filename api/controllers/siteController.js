const Sites = require('../models/siteModel')

const siteController = {
    createSite: async (req, res) => {
        try {
            const { site, postalCode } = req.body;

            const siteExists = await Sites.findOne({ site: site })
            if (siteExists) return res.status(400).json({ err: "The site already exists." })

            const newSite = new Sites({ site, postalCode })

            await newSite.save()

            res.status(201).json({
                msg: "Site created successfully.",
                newSite
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    updateSite: async (req, res) => {
        try {
            const { site, postalCode } = req.body;

            const newSite = await Sites.findOneAndUpdate({ _id: req.params.id },
                { site, postalCode },
                { new: true })

            res.status(200).json({
                msg: 'Site updated successfully.',
                profile: newSite._doc,
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deleteSite: async (req, res) => {
        try {

            await Sites.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Site deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getSite: async (req, res) => {
        try {

            const site = await Sites.findOne({ _id: req.params.id })

            res.status(200).json(site)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllSites: async (req, res) => {
        try {

            const sites = await Sites.find()

            res.status(200).json({ sites })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
}

module.exports = siteController