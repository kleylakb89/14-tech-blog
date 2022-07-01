const {Comment} = require('../models');

const commentData =[
    {
        text: 'Pretty neat stuff.',
        user_id: '3',
        blog_id: '2',
    },
    {
        text: 'Wowzers!',
        user_id: '1',
        blog_id: '1'
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;