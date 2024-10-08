//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const ssh = require('ssh2').Client;
const { Sequelize, DataTypes, Transaction } = require("sequelize");



const dotenv = require('dotenv').config();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ORM CONNECTION
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Main Code For Server 

// const sequelize_db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false,
// });

const sequelize_db = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,

    // dialectOptions: {
    //     "connectTimeout": 60000
    // },
    // define: {
    //     timestamps: false
    // },
    // pool: {
    //     // max: 10,
    //     // min: 0,
    //     acquire: 30000,
    //     idle: 30000
    // }
});
try {
    sequelize_db.authenticate();
    console.log('CONNECTION HAS BEEN ESTABLISHED SUCCESSFULLY.');
} catch (error) {
    console.error('UNABLE TO CONNECT TO THE DATABASE', error);
}



// Use this to  print the sql query on the terminal
// sequelize_db.options.logging = console.log;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = sequelize_db;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++