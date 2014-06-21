var predictor  = require('../index'),
events = require("events"),
should = require('chai').should()

describe('Predictor', function(){
  describe('#testCase1', function(){
    it('Predict for a block from 11:30 am to 12:00 am', function(done){
      //The logic is super simple
      //We assumpt that the historical data used to predicts is the data of yesterday
      //For example:
      // Current time : 08:00 am (20/06/2014)
      // We want to know next hot areas in between 11:30 am - 12:00 am (20/06/2014)

      //To get predict for a current time block, we pass the same time block of previous date
      //(19/06/2014)
      var start = new Date(2014, 5, 19, 11, 30, 0, 0 );
      var end = new Date(2014, 5, 19, 12, 00, 0, 0);
      predictor.getHotAreas(start, end, function(messages){
      	/*
      		Base on the test data, the area with id = 1 
      		has the ratio between available taxis and booking  < 40%
      		and there are more than 3 missed booking
      		at the time from 11:30 and 12:00 (19/06/2014)

      		So, the area (areaId = 1) is marked as a hot spot and return
      	*/
      	messages.length.should.equal(1);
      	if(messages.length == 1){
      		console.log("The message that pushed to Redis:");
      		console.log(messages[0]);
      		messages[0].area_id.should.equal(1);
      	}
      	done();
      });
    });
  })
})