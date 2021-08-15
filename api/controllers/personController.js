const Persons = require('../models/personModel')

const personController = {
    createPerson: async (req, res) => {
        try {
            const { firstName, lastName, document } = req.body;

            const person = await Persons.findOne({ document: document })
            if (person) return res.status(400).json({ err: "The person already exists." })

            const newPerson = new Persons({ firstName, lastName, document })

            await newPerson.save()

            res.status(201).json({
                msg: "Person created successfully.",
                newPerson
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    updatePerson: async (req, res) => {
        try {
            const { firstName, lastName, document } = req.body;

            const newPerson = await Persons.findOneAndUpdate({ _id: req.params.id },
                { firstName, lastName, document },
                { new: true })

            res.status(200).json({
                msg: 'Person updated successfully.',
                person: newPerson._doc,
            })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deletePerson: async (req, res) => {
        try {

            await Persons.findByIdAndDelete(req.params.id)

            res.status(200).json({ msg: 'Person deleted successfully.' })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getPerson: async (req, res) => {
        try {

            const person = await Persons.findOne({ _id: req.params.id })

            res.status(200).json(person)
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    getAllPersons: async (req, res) => {
        try {

            const persons = await Persons.find()

            res.status(200).json({ persons })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
}

module.exports = personController