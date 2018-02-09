var sequelize = require('../../models/util/dbConnect.js');
var Sequelize = require('sequelize');
var staff = require('../../models/fom/staff.js');
var dept = require('../../models/fom/dept.js');

dept.hasMany(staff,{foreignKey:'dept_id', targetKey:'id', as:'Dept'});

staff.sync({force: true});
dept.sync({force: true});
