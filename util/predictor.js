var DataHelper = require("./dthelper");
var events = require('events');
var util = require("util");


function Predictor() {
	this.helper = new DataHelper();
	this.connectionReady = false;
	this.driversPerArea = null;
	this.bookingsPerArea = null;
	this.missedBookingsPerArea = null;

	this.helper.on("data_helper_exception", function(ex){
		console.log(ex);
	});

	var that = this;
	that.helper.on("number_of_drivers_ready", function(driversMap){
		that.driversPerArea = driversMap;
		//If collect all needed data, goto process these data
		if(that.bookingsPerArea && that.missedBookingsPerArea) {
			that.calculate();
		}
	});

	that.helper.on("number_of_bookings_ready", function(bookingMap){
		that.bookingsPerArea = bookingMap[0];
		that.missedBookingsPerArea = bookingMap[1];
		//If collect all needed data, goto process these data
		if(that.driversPerArea) {
			that.calculate();
		}
	});
}

util.inherits(Predictor, events.EventEmitter);

//THRESHHOLD to raise an area as hot spot
//If number of driver / number of booking < 40%
// It means low resource
Predictor.THRESHHOLD_DRIVER_BOOKING_RATIO = "40";

// If more than 3 missed bookings in current area at an time block
// It should alert this area
Predictor.THRESHHOLD_MISSED_BOOKING_NUMBER = "3";

Predictor.prototype.getPredictedAreas = function(startBlock, endBlock) {
	var that = this;
	if(that.connectionReady == true) {
		that.helper.getNumberOfAvailableTaxiesInTimeBlock(startBlock, endBlock);
		that.helper.getNumberOfMissedBookingInTimeBlock(startBlock, endBlock);
	} else {
		//Init and start process
		that.helper.once("connection_ready", function() {
			that.connectionReady = true;
			that.helper.getNumberOfAvailableTaxiesInTimeBlock(startBlock, endBlock);
			that.helper.getNumberOfMissedBookingInTimeBlock(startBlock, endBlock);
		});
		that.helper.initConnection();
	}
}

Predictor.prototype.calculate = function () {
	var hotAreaIds = [];
	var numOfDriversInCurrentArea,
	numOfBookingsInCurrentArea,
	numOfMissedBookingInCurrentArea,
	driverBookingRatio;

	for(var areaId in this.bookingsPerArea) {
		numOfDriversInCurrentArea = this.driversPerArea[areaId];
		numOfBookingsInCurrentArea = this.bookingsPerArea[areaId];
		numOfMissedBookingInCurrentArea = this.missedBookingsPerArea[areaId];
		//if this ratio is too low, it means that the current area is a hot spot.
		driverBookingRatio  = (numOfDriversInCurrentArea/ numOfBookingsInCurrentArea) * 100;

		if(driverBookingRatio < Predictor.THRESHHOLD_DRIVER_BOOKING_RATIO
			&& numOfMissedBookingInCurrentArea > Predictor.THRESHHOLD_MISSED_BOOKING_NUMBER) {
			hotAreaIds.push(parseInt(areaId));
		}
	}
	var that = this;
	//Convert result to the messages and return
	this.helper.once("get_detail_done", function(hotAreas) {
		var hotArea = null;
		var messages = [];
		var message = null;
		for(var i = 0 ; i < hotAreas.length ; i++) {
			hotArea = hotAreas[i];
			message = {};
			message["area_id"] = hotArea.id;
			//The maximum driver needed in this area.
			//The logic is so simple because this is a demo.
			numOfBookingsInCurrentArea = that.bookingsPerArea[hotArea.id];
			message["max_number_of_driver"] = numOfBookingsInCurrentArea;
			message["name"] = hotArea.name;
			message["latitute"] = hotArea.center_latitute;
			message["longtitute"] = hotArea.center_longtitute;
			messages.push(message);
		}

		//Reset state of Predictor
		that.connectionReady = false;
		that.driversPerArea = null;
		that.bookingsPerArea = null;
		that.missedBookingsPerArea = null;

		that.emit("result_ready", messages);
	})
	this.helper.getAreasDetail(hotAreaIds);
	
}

module.exports = Predictor;
