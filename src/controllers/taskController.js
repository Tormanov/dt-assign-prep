const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');
const employeeService = require('../services/employeeService');
const taskService = require('../services/taskService');


router.get('/all', async (req, res) => {
    const tasks = await taskService.getAll();
    res.render('tasks/tasks', { tasks });
});

router.get('/search', async (req, res) => {
    const { name, phone } = req.query;
    const tasks = await taskService.search(name, phone);

    res.render('tasks/search', { tasks })
});


router.get('/:taskId/details', async (req, res) => {
    const task = await taskService.getOne(req.params.taskId);
    //TODO: Show tasks assigned to task

    res.render('tasks/details', { task });
});

router.get('/:taskId/edit', async (req, res) => {
    const task = await taskService.getOne(req.params.taskId);

    res.render('tasks/edit', { task });
});

router.post('/:taskId/edit', async (req, res) => {
    const taskData = req.body;

    await taskService.edit(req.params.taskId, taskData);

    res.redirect(`/tasks/${req.params.taskId}/details`);
});

router.get('/:taskId/delete', async (req, res) => {

    await taskService.delete(req.params.taskId);

    res.redirect('/tasks/all');

});


router.get('/create', async (req, res) => {
    const employees = await employeeService.getAll();

    res.render('tasks/create', { employees });
});

router.post('/create', async (req, res) => {
    const { title, description, assignee, dueDate } = req.body;

    try {

        const assigneeName = await employeeService.find(assignee);
        await taskService.create({ title, description, assignee, assigneeName, dueDate, status: 'Incomplete' });


    } catch (error) {
        return res.status(400).render('tasks/create', { error: getErrorMessage(error) });
    }

    const taskId = await taskService.find(title);
    await employeeService.updateTask(assignee, taskId);
    res.redirect('/tasks/all');

});



module.exports = router;