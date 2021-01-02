'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer, {foreignKey: 'customer_id'})
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    customer_id: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};