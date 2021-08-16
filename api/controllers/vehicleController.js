const Vehicles = require('../models/vehicleModel')

const vehicleController = {
    createVehicle: async (req, res) => {
        try {
            const { patent, brand, model, year } = req.body;

            const vehicle = await Vehicles.findOne({ patent: patent })
            if (vehicle) return res.status(400).json({ err: "The vehicle already exists." })

            const newVehicle = new Vehicles({ patent, brand, model, year })

            await newVehicle.save()

            res.status(201).json({
                msg: "Vehicle created successfully.",
                newVehicle
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    updateVehicle: async (req, res) => {
        try {
            const { patent, brand, model, year } = req.body;

            const newVehicle = await Vehicles.findOneAndUpdate({ _id: req.params.id },
                { patent, brand, model, year },
                { new: true })

            res.status(200).json({
                msg: 'Vehicle updated successfully.',
                vehicle: newVehicle._doc,
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deleteVehicle: async (req, res) => {
        try {

            await Vehicles.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Vehicle deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getVehicle: async (req, res) => {
        try {

            const vehicle = await Vehicles.findOne({ _id: req.params.id })

            res.status(200).json(vehicle)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllVehicles: async (req, res) => {
        try {

            const vehicles = await Vehicles.find()

            res.status(200).json({ vehicles })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
}

module.exports = vehicleController