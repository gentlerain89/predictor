var persist = require("persist"),
    type = persist.type,
    util = require("util"),
    Area = require("/model/area"),
 	Driver = require("/model/driver"),
 	DriverLog = require("/model/driver_log"),
 	Booking = require("/model/booking"),
	EventEmitter = require('events').EventEmitter,

var DataHelper = {};
util.inherits(DataHelper, EventEmitter);

DataHelper.prototype.initConnection() {
	persist.connect({}, function() {
		console.log("Connection established successfully!");
		DbHelper.emit("connection_ready");
	})
}

DataHelper.prototype.getNumberOfAvailableTaxiesInTimeBlock(blockStart, blockEnd) {
	var numOfDriversPerArea = {};
	DriverLog.where("time > ? and time < ?", [blockStart, blockEnd]).each(connection, function(error, driveLog){
		if(error) {
			//Throw exception
			DataHelper.emit("data_helper_exception", error);
			return {};
		} 
		driveLog.driver.where({'isAvailable' : 0}).count(connection, function(err, driverCount) {
			if(err) {
				DataHelper.emit("data_helper_exception", err);	
				return {};
			}
			if(numOfDriversPerArea[log.areaId]) {
				numOfDriversPerArea[log.areaId]  += driverCount;
			} else {
				numOfDriversPerArea[log.areaId] = 0;
			}
		});
		
	},
	function(error){
		//all done
		return numOfDriversPerArea;
	})
}

DataHelper.prototype.getNumberOfMissedBookingInTimeBlock(blockStart, blockEnd) {
	var numberOfBookingsPerArea = {};
	Booking.where("driverId = ? and time > ? and time < ?", [null, blockStart, blockEnd])
		   .each(connection, function (error, booking){
		   		if(error) {
		   			//Throw exception
					DataHelper.emit("data_helper_exception", error);
					return {};
		   		}
		   		if(numberOfBookingsPerArea[booking.areaId]) {
		   			numberOfBookingsPerArea[booking.areaId]  += 1;	
		   		} else {
		   			numberOfBookingsPerArea[booking.areaId]  = 0;	
		   		}
		   },
		   function(error){
		   		//all done
		   		return numberOfBookingsPerArea;
		   });
}

module.exports = DbHelper;