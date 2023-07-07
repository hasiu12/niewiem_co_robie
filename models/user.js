const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('quiz_database', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
  });

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
    const testUser = await User.findOne();
    console.log('Test User:', testUser);
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });
  
  
  module.exports = User;