var settings = require('./ic-settings');
var redraw = require('./ic-redraw');
var d3 = require("d3");

var normalize = function(data){
	data.map(function(d){
		d.date = new Date(d.date);
	});
	return data;
};

module.exports = function(dataPath) {

	// if you read your data from json file use this scenario
	// othervise just set settings.data = yourDataArray;

	d3.json(dataPath, function(error, data) {
		if(error) throw error;
		data = normalize(data);
		settings.data = data;
		redraw();
	});

};
