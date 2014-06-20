var DataHelper = require("./util/db");
var events = require('events');

var helper = new DataHelper();
helper.on("connection_ready", function() {
	var startBlock = new Date(2014, 5, 19, 9, 30, 0, 0);
	var endBlock = new Date(2014, 5, 19, 10, 0, 0, 0);
	console.log(startBlock);
	console.log(endBlock);
	this.getNumberOfAvailableTaxiesInTimeBlock(startBlock,endBlock);
	this.getNumberOfMissedBookingInTimeBlock(startBlock,endBlock);
});

helper.on("data_helper_exception", function(ex){
	console.log(ex);
});

helper.on("numOfDrivers", function(driversMap){
	console.log(driversMap);
});

helper.on("numberOfBookings", function(bookingMap){
	console.log(bookingMap);
});

helper.initConnection();