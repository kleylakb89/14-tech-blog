const {User} = require('../models');

const userData = [
    {
        username: 'FunGuy',
        email: 'fun@guy.com',
        password: '123goodtimes'
    },
    {
        username: 'CoolDude',
        email: 'cool@dude.com',
        password: '321coolstuff'
    },
    {
        username: 'BoyHowdy',
        email: 'boy@howdy.com',
        password: 'yeahson123'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;