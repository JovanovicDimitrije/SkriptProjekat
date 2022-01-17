const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('knjige', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_AUTOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autori',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'knjige',
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
        name: "ID_AUTOR",
        using: "BTREE",
        fields: [
          { name: "ID_AUTOR" },
        ]
      },
    ]
  });
};
