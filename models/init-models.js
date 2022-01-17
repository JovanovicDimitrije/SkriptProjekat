var DataTypes = require("sequelize").DataTypes;
var _autori = require("./autori");
var _knjige = require("./knjige");
var _komentari = require("./komentari");
var _korisnici = require("./korisnici");

function initModels(sequelize) {
  var autori = _autori(sequelize, DataTypes);
  var knjige = _knjige(sequelize, DataTypes);
  var komentari = _komentari(sequelize, DataTypes);
  var korisnici = _korisnici(sequelize, DataTypes);

  knjige.belongsTo(autori, { as: "ID_AUTOR_autori", foreignKey: "ID_AUTOR"});
  autori.hasMany(knjige, { as: "knjiges", foreignKey: "ID_AUTOR"});
  komentari.belongsTo(knjige, { as: "ID_KNJIGA_knjige", foreignKey: "ID_KNJIGA"});
  knjige.hasMany(komentari, { as: "komentaris", foreignKey: "ID_KNJIGA"});
  komentari.belongsTo(korisnici, { as: "ID_KORISNIK_korisnici", foreignKey: "ID_KORISNIK"});
  korisnici.hasMany(komentari, { as: "komentaris", foreignKey: "ID_KORISNIK"});

  return {
    autori,
    knjige,
    komentari,
    korisnici,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
