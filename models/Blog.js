const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,30],
            },
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
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    },
);

module.exports = Blog;