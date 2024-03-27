const {Sequelize, QueryTypes, DataTypes} = require('sequelize')
let sequelize = new Sequelize('sqlite:db.sqlite');

module.exports = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        auntoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allownull: false,
    },
    email:{
        type:DataTypes.STRING,
        allownull:false,
    },
    password:{
        type: DataTypes.STRING,
        allownull:false,
    },
    
    
},{tabelname:'users', timestamps: false});