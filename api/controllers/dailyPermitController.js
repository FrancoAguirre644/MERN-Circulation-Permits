const DailyPermits = require('../models/dailyPermitModel')

const dailyPermitController = {
    createDailyPermit: async (req, res) => {
        try {
            const { personId, fromSiteId, toSiteId, reason } = req.body;

            const newDailyPermit = new DailyPermits({
                person: personId,
                from: fromSiteId,
                to: toSiteId,
                reason
            })

            await newDailyPermit.save()

            res.status(201).json({
                msg: "Daily Permit created successfully.",
                newDailyPermit
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deleteDailyPermit: async (req, res) => {
        try {

            await DailyPermits.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Daily Permit deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getDailyPermit: async (req, res) => {
        try {

            const dailyPermit = await DailyPermits.findOne({ _id: req.params.id }).populate(['person', 'from', 'to'])

            res.status(200).json(dailyPermit)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllDailyPermits: async (req, res) => {
        try {

            const dailyPermits = await DailyPermits.find().populate(['person', 'from', 'to'])
            
            res.status(200).json({ dailyPermits })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
}

module.exports = dailyPermitController