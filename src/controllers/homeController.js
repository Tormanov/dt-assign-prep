const router = require('express').Router();
const employeeService = require('../services/employeeService');


router.get('/', async (req, res) => {
    const employees = await employeeService.getTop();

    res.render('home', { employees })
});

module.exports = router;