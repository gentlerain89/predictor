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
	var driverLog = null;
	DriverLog.where("time >= ? and time < ? and isAvailable = ?", [blockStart, blockEnd, DriverLog.DRIVER_STATUS_AVAILABLE])
	 .all(that.connection, function(error, driveLogs){
		if(error) {
			//Throw exception
			that.emit("data_helper_exception", error);
			return ;
		}else{
			for(var i = 0 ; i < driveLogs.length ; i++) {
				driverLog = driveLogs[i];
				if(numOfDriversPerArea[driverLog.areaId]) {
					numOfDriversPerArea[driverLog.areaId]  += driverCount;
				} else {
					numOfDriversPerArea[driverLog.areaId] = 0;
				}
			}
	 		that.emit("number_of_drivers_ready", numOfDriversPerArea);
		}	
	});
}

DataHelper.prototype.getNumberOfMissedBookingInTimeBlock = function(blockStart, blockEnd) {
	var numberOfBookingsPerArea = {};
	var numberOfMissedBookingsPerArea = {};
	var that = this;
	Booking.where("time > ? and time < ?", [blockStart, blockEnd])
		   .all(that.connection, function (error, bookings){
		   		if(error) {
		   			//Throw exception
					that.emit("data_helper_exception", error);
					return;
		   		}
		   		var areaId = 0;
		   		for(var i = 0 ; i < bookings.length; i++) {
		   			 areaId = "" + bookings[i].area_id;
			   		if(numberOfBookingsPerArea[areaId] >= 0) {
			   			numberOfBookingsPerArea[areaId]++;	
			   		} else {
			   			numberOfBookingsPerArea[areaId]  = 1;	
			   		}

			   		if(!bookings[i].driver_id) {
						if(numberOfMissedBookingsPerArea[areaId] >= 0) {
			   				numberOfMissedBookingsPerArea[areaId]++;	
				   		} else {
				   			numberOfMissedBookingsPerArea[areaId]  = 1;	
				   		}	
			   		}
		   		}
		   		that.emit("number_of_bookings_ready", [numberOfBookingsPerArea, numberOfMissedBookingsPerArea]);
		   });
}

DataHelper.prototype.getAreasDetail = function(areaIds) {
	var that = this;
	Area.whereIn('id', areaIds).all(that.connection,function(error, areas){
		if(error) {
			//Throw exception
			that.emit("data_helper_exception", error);
			return;
		} else {
			that.emit("get_detail_done", areas);
		}
	});
}

module.exports = DataHelper;