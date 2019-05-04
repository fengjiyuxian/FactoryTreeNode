"use strict";
const Sequelize = require('sequelize');

// Setting up a connection
const db = new Sequelize('db_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// set factory Model
const Factory = db.define('factory',{
    factoryId:  {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

// set child Model
const Child = db.define('child',{
    childId:  {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    factoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

db.sync()
    .then(() => console.log("Database is synchronized"))
    .catch((err) => console.log(err));

module.exports = {
    Factory, Child
}