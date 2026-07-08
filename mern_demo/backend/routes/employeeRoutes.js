const router = require('express').Router();

const Employee = require('../models/Employee');

router.post('/', async (req, res) => {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
});

router.get('/', async (req, res) => {
    const employees = await Employee.find().populate('departmentId');
    res.status(200).json(employees);
}
);

router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id).populate('departmentId');
    res.status(200).json(employee);
});

router.put('/:id', async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('departmentId');
    res.status(200).json(employee);
});

router.delete('/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;