//Daily travel log of drivers.
//Consider the it is update every 30 mins

var persist = require("persist");
var type = persist.type;
var DriverLog = persist.define("driver_travel_log", {
  "id" : {type : type.INTEGER, primaryKey: true},
  "driver_id" : type.INTEGER, //Id of tracked driver
  "area_id": type.INTEGER,//The area that driver and his car is on at this time
  "time": type.DATETIME,//The time block, 30 mins each block (ex: "2014/06/19 9:30", "2014/06/19 10:00")
  "isAvailable" : type.INTEGER // The status of tracked driver in this time block (has passenger or not)
});

module.exports = DriverLog;