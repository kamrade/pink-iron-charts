var d3 = require("d3");
var classie = require("./classie");
var settings = require("./settings");

console.log( "d3 version is " + d3.version );

var pinkIronCharts = require('./pink-iron-charts/pink-iron-charts');

var icOptions = {
	sizes: {
		width: 640,
		height: 200,
		margins: {
			top: 20,
			bottom: 40,
			left: 40,
			right: 20
		}
	},
	el: '.charts',
	scale: {},
	axis: {},
	shapes: {}
};

pinkIronCharts.start(icOptions, '../data/transactions.json');

var clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function(){
	pinkIronCharts.clear();
}, false);

var redrawBtn = document.getElementById('redraw');
redrawBtn.addEventListener('click', function(){
	console.log('redraw');
	pinkIronCharts.clear();
	pinkIronCharts.init(icOptions);
	pinkIronCharts.redraw();
}, false);
