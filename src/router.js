const router = require('express').Router();

const homeController = require('./controllers/homeController');
const employeeController = require('./controllers/employeeController');
const taskController = require('./controllers/taskController');

router.use(homeController);
router.use('/employees', employeeController);
router.use('/tasks', taskController);
router.all('*', (req, res) => {
    res.render('home/404')
})

module.exports = router;