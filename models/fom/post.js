var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var post = sequelize.define('post',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    post: Sequelize.STRING,
    describe: Sequelize.STRING(500)
},{
    // timestamps: false,
    tableName: 'u_post'
});

module.exports = post;