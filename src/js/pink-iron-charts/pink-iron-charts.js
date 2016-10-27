var d3 = require("d3");

var settings = require('./ic-settings');
var init     = require('./ic-init');
var reload   = require('./ic-reload');
var redraw   = require('./ic-redraw');
var clear    = require('./ic-clear');

module.exports = (function(){

	var start = function(options, dataPath){
		init(options);
		reload(dataPath);
	};

	return {
		start: start,
		init: init,
		redraw: redraw,
		clear: clear
	};

})();
