const express = require('express');
const handlebars = require('express-handlebars');

const routes = require('./router');
const initDatabase = require('./config/databaseInit');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

initDatabase()
    .then(() => app.listen(3000, () => console.log(`Server is running on port 3000`)))
    .catch((err) => console.error(err.message));
