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
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        minInput(value){
          if(+value < 500000 && value != 0){
            throw new Error('Minimum balance for new Accout: Rp500.000')
          }
        }
      }
    },
    customer_id: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
    hooks: {
      beforeCreate(instance, options){
        const number = (Math.random()*10).toString().replace('.', '').slice(0, 10)
        instance.accountNumber = number
        if(instance.balance === 0){
          instance.balance = 500000
        }
      }
    }
  });
  return Account;
};