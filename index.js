var Predictor = require("./util/predictor");
var redisManager = require('redis-client-manager');

var redisClient = redisManager.getClient();
var predictor = new Predictor();

/**
 * export a simple api function which ready to be called.
 */
module.exports.getHotAreas = function (start, end , callback) {
  predictor.once("result_ready", function(messages) {
	redisClient.lpush('predictions', messages);
  	callback(messages);
  });
  predictor.getPredictedAreas(start, end); 
};
