# FactoryTreeNode
coding challenge

# install node, mysql, sequelize, ejs

# mysql database setup
set the database parameters according to your databse,
here we use sequelize and mysql.
eg:  const db = new Sequelize('db_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}); 

# set server address in socketIo 