const router = require('express').Router();

const Department = require('../models/Department');

router.post('/', async (req, res) => {
    const department = await Department.create(req.body);
    res.status(201).json(department);
});

router.get('/', async (req, res) => {
    const departments = await Department.find();
    res.status(200).json(departments);
});

router.get('/:id', async (req, res) => {
    const department = await Department.findById(req.params.id);
    res.status(200).json(department);
});

router.put('/:id', async (req, res) => {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(department);
});

router.delete('/:id', async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;