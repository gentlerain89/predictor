var persist = require("persist");
var DriverLog = require("./DriverLog");
var type = persist.type;
var Area = persist.define("area", {
  "id" : {type:type.INTEGER, primaryKey:true},
  "name": type.STRING,//Name/Code of the area (ex: district1_block1, district2_block2)
  "center_longtitute": type.STRING,//The geographic information of the center point of area
  "center_latitute": type.STRING
}).hasMany(DriverLog);

module.exports = Area;
