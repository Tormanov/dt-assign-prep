const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');
const employeeService = require('../services/employeeService');


router.get('/all', async (req, res) => {
    const employees = await employeeService.getAll();
    res.render('employees/employees', { employees });
});

router.get('/search', async (req, res) => {
    const { name, phone } = req.query;
    const employees = await employeeService.search(name, phone);

    res.render('employees/search', { employees })
});


router.get('/:employeeId/details', async (req, res) => {
    const employee = await employeeService.getOne(req.params.employeeId);
    //TODO: Show tasks assigned to employee

    res.render('employees/details', { employee });
});

router.get('/:employeeId/edit', async (req, res) => {
    const employee = await employeeService.getOne(req.params.employeeId);

    res.render('employees/edit', { employee });
});

router.post('/:employeeId/edit', async (req, res) => {
    const employeeData = req.body;

    await employeeService.edit(req.params.employeeId, employeeData);

    res.redirect(`/employees/${req.params.employeeId}/details`);
});

router.get('/:employeeId/delete', async (req, res) => {

    await employeeService.delete(req.params.employeeId);

    res.redirect('/employees/all');

});


router.get('/create', (req, res) => {
    res.render('employees/create');
});

router.post('/create', async (req, res) => {
    const employeeData = req.body;

    try {
        await employeeService.create(employeeData);

    } catch (error) {
        return res.status(400).render('employees/create', { error: getErrorMessage(error) });
    }

    res.redirect('/employees/all');
});



module.exports = router;