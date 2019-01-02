// External Dependencies
const boom = require('boom');

// Get data models
const Car = require('../models/Car');

// Get all cars
exports.getCars = async (req, reply) => {
    try {
        return await Car.find()
    } catch (e) {
        throw boom.boomify(e)
    }
};

// Get single car by ID
exports.getSingleCar = async (req, reply) => {
    try {
        const id = req.params.id;
        return await Car.findById(id)
    } catch (e) {
        throw boom.boomify(e)
    }
};

// Add new car
exports.addCar = async (req, reply) => {
    try {
        const car = new Car(req.body);
        return car.save()
    } catch (e) {
        throw boom.boomify(e)
    }
};

// Update an exist car
exports.updateCar = async (req, reply) => {
    try {
        const id = req.para.id;
        const car = req.body;
        const {... updateData} = car;
        const update = await Car.findByIdAndUpdate(id, updateData, {new: true});
        return update
    } catch (e) {
        throw bom.boomify(e)
    }
};

// Delete a car
exports.deleteCar = async (req, reply) => {
    try {
        const id = req.params.id;
        const car = await  Car.findByIdAndRemove(id);
        return car
    } catch (e) {
        throw boom.boomify(e)
    }
};

