const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('komentari', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_KNJIGA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'knjige',
        key: 'ID'
      }
    },
    ID_KORISNIK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'korisnici',
        key: 'ID'
      }
    },
    KOMENTAR: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'komentari',
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
        name: "ID_KNJIGA",
        using: "BTREE",
        fields: [
          { name: "ID_KNJIGA" },
        ]
      },
      {
        name: "ID_KORISNIK",
        using: "BTREE",
        fields: [
          { name: "ID_KORISNIK" },
        ]
      },
    ]
  });
};
