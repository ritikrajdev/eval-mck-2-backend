'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  company.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    ceo: DataTypes.STRING,
    description: DataTypes.TEXT,
    tags: DataTypes.JSON,
    sector: DataTypes.STRING,
    score: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'company',
    timestamps: false
  });
  return company;
};