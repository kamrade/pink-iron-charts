var settings = require('./ic-settings');
var d3 = require("d3");

module.exports = function() {

	if(settings.scale) {
		settings.scale.x.domain([ settings.data[0].date, settings.data[settings.data.length - 1].date ]);
		settings.scale.y.domain([ 0, d3.max(settings.data, function(d){ return d.total; }) ]).nice();
	}

	settings.zoom = d3.behavior.zoom()
		.x(settings.scale.x)
		.scaleExtent([1, 10])
		.on('zoom', zoomed);

	settings.canva = settings.svg.append('svg')
		.call(settings.zoom)
		.attr('width', settings.sizes.width + settings.sizes.margins.left + settings.sizes.margins.right)
		.attr('height', settings.sizes.height + settings.sizes.margins.top + settings.sizes.margins.bottom)
		.append('g')
		.attr('transform', 'translate(' + settings.sizes.margins.left + ', ' + settings.sizes.margins.top + ')')
		;

	settings.canva.append('clipPath')
		.attr('id', 'clip')
		.append('rect')
		.attr('width', settings.sizes.width)
		.attr('height', settings.sizes.height);

	settings.canva.datum(settings.data);
	settings.zoom.scale(settings.zooming.scale);
	settings.zoom.translate(settings.zooming.translate);

	var groupArea = settings.canva.append('g')
		.attr('class', 'g-area');
	groupArea.append('path')
		.attr('class', 'area')
		.attr('fill', 'url(#Gradient1)')
		.attr('clip-path', 'url(#clip)')
		.attr('d', settings.shapes.area);

	settings.canva.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + settings.sizes.height + ')')
		.call(settings.axis.xAxis);

	settings.canva.append('g')
		.attr('class', 'y axis')
		.call(settings.axis.yAxis);

	var groupLineCaptured = settings.canva.append('g')
		.attr('class', 'g-line-capured');
	groupLineCaptured.append('path')
		.attr('class', 'line line-captured')
		.attr('clip-path', 'url(#clip)')
		.attr('d', settings.shapes.lineCaptured);

	var groupLineDeclined = settings.canva.append('g')
		.attr('class', 'g-line-declined');
	groupLineDeclined.append('path')
		.attr('class', 'line line-declined')
		.attr('clip-path', 'url(#clip)')
		.attr('d', settings.shapes.lineDeclined);

	settings.canva.append('text')
		.attr('x', settings.sizes.width - 6)
		.attr('y', settings.sizes.height - 6)
		.style('text-anchor', 'end')
		.text('Look at this text!');

	settings.canva.append('g')
		.attr('class', 'dots')
		.attr('clip-path', 'url(#clip)')
		.selectAll('circle')
		.data(settings.data)
		.enter()
		.append('circle')
		.attr('class', 'dot');

	settings.svg.select('.dots')
		.selectAll('circle')
		.transition()
		.duration(500)
		.attr('cx', function(d){
			return settings.scale.x(d.date);
		})
		.attr('cy', function(d){
			return settings.scale.y(d.CAPTURED);
		})
		.attr('r', 4);

};

var zoomed = function() {

	// memorize current zoom
	settings.zooming.scale = d3.event.scale;
	settings.zooming.translate = d3.event.translate;
	// left and right translatinon restriction
	var tx = d3.event.translate[0];
	var ty = d3.event.translate[1];
	var max_X_Position = settings.scale.x(settings.data[settings.data.length - 1].date);
	var maxX = -1*(-1*tx + max_X_Position - settings.sizes.width);
	if(tx > 0 ) {
		settings.zoom.translate([0, 0]);
		settings.zooming.translate = [0,0];
	}
	if(tx < maxX ) {
		settings.zoom.translate([maxX, 0]);
		settings.zooming.translate = [maxX, 0];
	};

	// zooming
	settings.svg.select(".x.axis").call(settings.axis.xAxis);
	settings.svg.select(".y.axis").call(settings.axis.yAxis);
	settings.svg.select('.area').attr('d', settings.shapes.area);
	settings.svg.select(".line.line-captured")
		.attr("class", "line line-captured")
		.attr("d", settings.shapes.lineCaptured);
	settings.svg.select(".line.line-declined")
		.attr("class", "line line-declined")
		.attr("d", settings.shapes.lineDeclined);
	settings.svg.select('.dots')
		.selectAll('circle')
		.attr('cx', function(d){
			return settings.scale.x(d.date);
		})
		.attr('cy', function(d){
			return settings.scale.y(d.CAPTURED);
		})
		.attr('r', 4);
};
