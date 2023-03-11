const router = require('express').Router();

const homeController = require('./controllers/homeController');
const employeeController = require('./controllers/employeeController');

router.use(homeController);
router.use('/employees', employeeController);

module.exports = router;