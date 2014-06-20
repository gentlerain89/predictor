var persist = require("persist");
var DriverLog = require("./DriverLog");
var type = persist.type;
var Driver = persist.define("driver", {
  "id" : {type.INTEGER, primaryKey: true},
  "name": type.STRING,//Name of the driver
  "company": type.STRING,//Company of driver (ex: Vinasun, MaiLinh)
  "license_plate": type.STRING
}).hasMany(DriverLog);

module.exports = Driver;
