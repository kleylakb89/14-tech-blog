const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,5000],
            },
        },
        post_date: {
            type: DataTypes.DATEONLY,
            // get() {
            //     return moment(this.getDataValue('post_date').format('DD.MM.YYY'));
            // },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    },
);

module.exports = Comment;