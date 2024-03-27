const {Sequelize, QueryTypes, DataTypes} = require('sequelize')
let sequelize = new Sequelize('sqlite:db.sqlite');

module.exports = sequelize.define('Movie',{
    name: {
        type: DataTypes.STRING,
        allownull: false,
    },
    year:{
        type: DataTypes.INTEGER,
        allownull: false,
    },
    description:{
        type: DataTypes.TEXT,
    },
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
    
    
},{tabelname:'movies', timestamps: false});