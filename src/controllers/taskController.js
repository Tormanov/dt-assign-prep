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

router.get('/:taskId/complete', async (req, res) => {
    const task = await taskService.getOne(req.params.taskId);
    await taskService.updateStatus(req.params.taskId);
    await employeeService.completeTask(task.assignee);

    res.redirect('/tasks/all')

});

router.get('/:taskId/details', async (req, res) => {
    const task = await taskService.getOne(req.params.taskId);
    let isNotCompleted = true;
    if (task.status === 'Completed') {
        isNotCompleted = false;
    };
    res.render('tasks/details', { task, isNotCompleted });
});

router.get('/:taskId/edit', async (req, res) => {
    const task = await taskService.getOne(req.params.taskId);
    const employees = await employeeService.getAll();
    res.render('tasks/edit', { task, employees });
});

router.post('/:taskId/edit', async (req, res) => {

    const { title, description, assignee, dueDate } = req.body;

    try {

        const assigneeName = await employeeService.find(assignee);


        await employeeService.removeTask(req.params.taskId)
        await taskService.edit(req.params.taskId, { title, description, assignee, assigneeName, dueDate });

        const taskId = await taskService.find(title);
        await employeeService.addTask(assignee, taskId);

        res.redirect(`/tasks/${req.params.taskId}/details`);
    }
    catch (error) {
        const employees = await employeeService.getAll();
        return res.status(400).render(`tasks/edit`, { error: getErrorMessage(error), task: { title, description, assignee, dueDate }, employees });
    }

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
    const employees = await employeeService.getAll();

    try {

        const assigneeName = await employeeService.find(assignee);
        await taskService.create({ title, description, assignee, assigneeName, dueDate, status: 'Incomplete' });


    } catch (error) {
        return res.status(400).render('tasks/create', { error: getErrorMessage(error), employees });
    }

    const taskId = await taskService.find(title);
    await employeeService.addTask(assignee, taskId);
    res.redirect('/tasks/all');

});



module.exports = router;