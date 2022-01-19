const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('korisnici', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IME: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "IME"
    },
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ADMIN: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'korisnici',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "IME",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IME" },
        ]
      },
    ]
  });
};
