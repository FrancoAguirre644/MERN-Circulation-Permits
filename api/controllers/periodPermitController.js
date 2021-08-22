const PeriodPermits = require('../models/periodPermitModel')

const periodPermitController = {
    createPeriodPermit: async (req, res) => {
        try {
            const { personId, fromSiteId, toSiteId, vehicleId, days, vacations } = req.body;

            const newPeriodPermit = new PeriodPermits({
                person: personId,
                from: fromSiteId,
                to: toSiteId,
                vehicle: vehicleId,
                days,
                vacations
            })

            await newPeriodPermit.save()

            res.status(201).json({
                msg: "Period Permit created successfully.",
                newPeriodPermit
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deletePeriodPermit: async (req, res) => {
        try {

            await PeriodPermits.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Period Permit deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getPeriodPermit: async (req, res) => {
        try {

            const periodPermit = await PeriodPermits.findOne({ _id: req.params.id }).populate(['person', 'from', 'to'])

            res.status(200).json(periodPermit)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllPeriodPermit: async (req, res) => {
        try {

            const periodPermits = await PeriodPermits.find().populate(['person', 'from', 'to', 'vehicle'])
            
            res.status(200).json({periodPermits})
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    } 
}

module.exports = periodPermitController