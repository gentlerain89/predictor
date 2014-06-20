//Booking request from customer

var persist = require("persist");
var type = persist.type;
var Booking = persist.define("booking", {
  "id" : {type : type.INTEGER, primaryKey : true},
  "area_id" : type.INTEGER, //Id of the area where the booking are placed (send from)
  "time": type.DATETIME,//The moment the booking send by customer
  "driver_id": type.INTEGER,//If has value, the booking has been fullfilled by a driver, 
  //if missed this booking considered MISSED
  "customer_id" : type.INTEGER // Id of customer who placed the booking
});

module.exports = Booking;