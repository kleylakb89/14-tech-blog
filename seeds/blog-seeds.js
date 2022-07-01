const {Blog} = require('../models');

const blogData =[
    {
        title: 'Fill your database with sequelize',
        text: 'A break down of sequelize\'s finest aspects.',
        user_id: '2',
    },
    {
        title: 'What ever happened to jQuery?',
        text: 'Let\'s take a look.',
        user_id: '1',
    },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;