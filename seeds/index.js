const sequelize = require('../config/connection');
const {User, Blog, Comment} = require('../models');
const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');
const seedComments = require('./comment-seeds');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await User.bulkCreate(seedUsers);
    console.log('\n----- USERS SEEDED -----\n');

    await Blog.bulkCreate(seedBlogs);
    console.log('\n----- BLOGS SEEDED -----\n');

    await Comment.bulkCreate(seedComments);
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();