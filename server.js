// require dependencies
// create routes
// create connection
// create .env
// create database
// create seeds
// create models
// create views
// create public css and js
// create handlebars

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handelbars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log('Listening at port http://localhost:3001'));
})