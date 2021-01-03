'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Account, {foreignKey: 'customer_id'})
    }
  };
  Customer.init({
    identityNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Duplicate Identity Number'
      },
      validate: {
        notEmpty: {
          msg: 'Identity Number must be filled'
        },
        len: {
          args: [16,20],
          msg: 'Identity Number minimum 16 characters and maximum 20 characters'
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Full name must be filled'
        }
      }
    },
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Birth Date must be filled'
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
    // hooks: {
    //   beforeCreate(instance, options){
    //     if(instance.birthDate === 'Invalid date'){
    //       instance.birthDate = '2000-01-01'
    //     }
    //   }
    // }
  });
  return Customer;
};