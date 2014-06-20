var persist = require("persist"),
    type = persist.type,
    util = require("util"),
    Area = require("./model/area"),
 	Driver = require("./model/driver"),
 	DriverLog = require("./model/driver_log"),
 	Booking = require("./model/booking"),
	events = require('events');

function DataHelper(options) {
	this.options = options;
	this.connection = null;
};
util.inherits(DataHelper, events.EventEmitter);


DataHelper.prototype.initConnection = function(){
	var that = this;
	persist.connect(function(error, pConnection) {
		if(error) {
			that.emit("data_helper_exception", error);	
		} else {
			that.connection = pConnection;
			that.emit("connection_ready");
		}
	})
}

DataHelper.prototype.getNumberOfAvailableTaxiesInTimeBlock = function(blockStart, blockEnd) {
	var numOfDriversPerArea = {};
	var that = this;
	DriverLog.where("time > ? and time < ?", [blockStart, blockEnd]).each(that.connection, function(error, driveLog){
		if(error) {
			//Throw exception
			that.emit("data_helper_exception", error);
			return ;
		} 
		driveLog.driver.where({'isAvailable' : 0}).count(that.connection, function(err, driverCount) {
			if(err) {
				that.emit("data_helper_exception", err);	
				return;
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
		that.emit("numOfDrivers", numOfDriversPerArea);
	})
}

DataHelper.prototype.getNumberOfMissedBookingInTimeBlock = function(blockStart, blockEnd) {
	var numberOfBookingsPerArea = {};
	var numberOfMissedBookingsPerArea = {};
	var that = this;
	Booking.where("time > ? and time < ?", [null, blockStart, blockEnd])
		   .each(that.connection, function (error, booking){
		   		if(error) {
		   			//Throw exception
					that.emit("data_helper_exception", error);
					return;
		   		}
		   		if(numberOfBookingsPerArea[booking.areaId]) {
		   			numberOfBookingsPerArea[booking.areaId]  += 1;	
		   		} else {
		   			numberOfBookingsPerArea[booking.areaId]  = 0;	
		   		}

		   		if(!booking.driverId) {
					if(numberOfMissedBookingsPerArea[booking.areaId]) {
		   				numberOfMissedBookingsPerArea[booking.areaId]  += 1;	
			   		} else {
			   			numberOfMissedBookingsPerArea[booking.areaId]  = 0;	
			   		}	
		   		}
		   },
		   function(error){
		   		//all done
		   		that.emit("numberOfBookings", [numberOfBookingsPerArea, numberOfMissedBookingsPerArea]);
		   });
}

module.exports = DataHelper;