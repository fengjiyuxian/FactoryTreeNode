# FactoryTreeNode
coding challenge

# install node, mysql, sequelize, ejs

# mysql database setup
set the database parameters according to your databse,
here we use sequelize and mysql.
eg:  const db = new Sequelize('your_db_name', 'your_username', 'password', {
  host: 'localhost',
  dialect: 'mysql' ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}); 

# set server address in socketIo in /public/javascripts/tree.js
eg: var socket = io('//localhost:3000');
you can set your own ip(or host) and port.