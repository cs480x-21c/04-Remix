// https://www.reddit.com/r/dataisbeautiful/comments/m0z52s/oc_today_almost_half_of_the_6900_languages_spoken/ <br>
// https://www.kaggle.com/the-guardian/extinct-languages

var labels = [
	'Vulnerable',
	'Definitely endangered',
	'Severely endangered',
	'Critically endangered',
	'Extinct'
]

var color = d3.scaleOrdinal()
	.range([
		'#C8F55F',
		'#FFD000',
		'#EB8C00',
		'#FF4600',
		'#F50033'
	])
	.domain(labels)

var mapSVG = null
var chartSVG = null

Promise.all([
	d3.json("countries-50m.json"),
	d3.csv("Country_data.csv"),
	d3.csv("Totals.csv")
]).then(([world, data, totals]) => {
	createMap(world, data, totals)
	mapSVG = d3.select("body").select('#map')
	colorMap(data)
	createChart(data, totals)
	chartSVG = d3.select('body').select("#chart")
})


/*
function highlight(hover) {
	var map = d3.select('#map')
	var chart = d3.select('#chart')
	
	chart.selectAll("rect")
		.attr('opacity', 0.3)
				
	map.selectAll("circle")
		.attr('opacity', 0)

	hover.attr('opacity', 0.75);
				
	map.selectAll('#c_' + hover.attr('id'))
		.attr('opacity', 0.5)

	labels.forEach(function(d) {
		map.selectAll('#legend_'+d.replace(/\s/g,'_'))
			.attr('opacity', 0.5)	
	})

	map.selectAll('#legend')
		.attr('opacity', 0.5)
}


function filter(source, show) {
	var map = d3.select('#map')
	var status = source.attr('id').substring('legend_'.length, source.attr('id').length)

	source.attr('fill', show ? color(status.replace(/_/g, ' ')) : 'gray')

	map.selectAll("#c_" + status)
		.attr('opacity', show ? 0.5 : 0)

	source.attr('show', show)
}*/

function clean(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f\s.']/g, "")
}


function createMap(world, data, totals) {
	var countries = topojson.feature(world, world.objects.countries)

	var proj = d3.geoRobinson()
		.translate([550, 300])
		.scale(170)

	var gpath = d3.geoPath()
		.projection(proj);

	var width = 1200,
		height = 600

	var map = d3.select('body').select('#map')

	if (map.empty()) {
		map = d3.select('body').append('svg')
			.attr("width", width)
			.attr("height", height)
			.attr('id', 'map')
	}

	map.selectAll('path')
		.data(countries.features)
		.enter()
		.append('path')
			.attr('d', d => gpath(d))
			.attr('stroke-width', 1)
			.attr('stroke', '#252525')
			.attr('fill', 'white')
			.attr('opacity', 0.75)
			.attr('id', d => clean(d.properties.name) )
			.on('mouseover', function(d, i) {
				cdata = data.filter(d => d.Country == i.properties.name)
				
				if (cdata.length != 0) { 
					d3.select(this).attr('opacity', 1)
					createChart(data, data.filter(d => d.Country == i.properties.name))
				}
			})
			.on('mouseout', function() {
				d3.select(this).attr('opacity', 0.75)
				createChart(data, totals)
			})
}

function colorMap(data, status='TOTAL') {
	var cColor = d3.scaleSequential(d3.interpolatePlasma)
		.domain([0, d3.max(data.filter(d => d.Status == status).map(d => parseInt(d.Languages)))])

	data.forEach(function(d) {
		if (d.Status == status) {
			mapSVG.select('#'+clean(d.Country))
				.attr('fill', () => cColor(parseInt(d.Languages)) )
		}
	})

	mapSVG.selectAll('path')
		.attr('fill', t => 
			data.filter(d => d.Status == status)
				.map(d => d.Country)
				.filter((value, index, self) => self.indexOf(value) === index)
				.includes(t.properties.name)
				? mapSVG.select('#'+clean(t.properties.name)).attr('fill') : 'gray'
		)
}


function createChart(data, totals) {
	//ref: https://bl.ocks.org/d3noob/d805555ee892425cc582dcb245d4fc59

	var margin = {top: 20, right: 20, bottom: 50, left: 110},
		width = 960 - margin.left - margin.right,
		height = 520 - margin.top - margin.bottom;

	var y = d3.scaleBand()
		.range([0, height])
		.domain(labels)
		.padding(0.1);

	var x = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(totals.filter(d => labels.includes(d.Status)).map(d => parseInt(d.Languages)))])

	if (!d3.select('body').select('#chart').empty()) { //if the chart already exists, delete it
		d3.select('body').select('#chart').remove()
	}

	var chart = d3.select('body').append('svg')
		.attr("width", width + margin.left + margin.right)
		.attr('padding-left', margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.attr('id','chart')
		.append("g")
			.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");

	// append the rectangles for the bar chart
	chart.selectAll("rect")
		.data(totals.filter(d => d.Status != 'TOTAL'))
		.enter()
		.append("rect")
			.attr("y", d => y(d.Status) )
			.attr("height", y.bandwidth())
			.attr("width", d => x(parseInt(d.Languages)) )
			.attr('x', 1)
			.attr('fill', d => color(d.Status))
			.attr('opacity', 0.5)
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-opacity', 0.5)
			.attr('id', d => clean(d.Status) +"_bar")
			.on('mouseover', function(d, i) {
				colorMap(data, i.Status)
				d3.select(this).attr('opacity', 1)
			})
			.on('mouseout', function() {
				colorMap(data)
				d3.select(this).attr('opacity', 0.5)
			})
			/*.attr('id', d => d.replace(/\s/g,'_') )
			.on('mouseover', function () {
				if (lockedID == null) {
					highlight(d3.select(this))
				}
			})
			.on('click', function() {
				tID = d3.select(this).attr('id')
				if (lockedID != tID) {
					lockedID = tID
					highlight(d3.select(this))

					d3.select(this)
						.attr('opacity', 1)
				} else {
					lockedID = null
					d3.select(this).attr('opacity', 0.75);
				}
			})
			.on('mouseout', function () {
				if (lockedID == null) {
					svg.selectAll("rect")
						.attr('opacity', 0.5)
					
					labels.forEach(function(d) {
						dID = d.replace(/\s/g,'_')
						if (map.select('#legend_'+dID).attr('show') == 'true') {
							map.selectAll('#c_' + dID)
								.attr('opacity', 0.5)
						} else {
							map.selectAll('#c_' + dID)
								.attr('opacity', 0)
						}
					})
				}
			})*/

	// add the x Axis
	chart.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .attr('id', 'botAxis')
	  .call(d3.axisBottom(x));

	// add the y Axis
	chart.append("g")
	  .call(d3.axisLeft(y));
	  
	chart.append("text")             
	  .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
	  .style("text-anchor", "middle")
	  .text("Number of Languages");
	
}


/*
function createMap(world, data) {
	lockedID = null

	//var land = topojson.feature(world, world.objects.land)
	var countries = topojson.feature(world, world.objects.countries)

	var proj = d3.geoRobinson()
		.translate([550, 300])
		.scale(170)

	var gpath = d3.geoPath()
		.projection(proj);

	var width = 1200,
		height = 600

	var map = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr('id', 'map')

	map.selectAll('path')
		.data(countries.features)
		.enter()
		.append('path')
			.attr('d', d => gpath(d))
			.attr('stroke-width', 1)
			.attr('stroke', '#252525')
			.attr('fill', 'white')

	let tooltip = d3.select('body') //ref: http://bl.ocks.org/biovisualize/1016860
		.append('div')
			.style('position', 'absolute')
			.style('visibility', 'hidden')
			.style('border', '1px solid black')
			.style('background-color', 'white');


	map.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
			.attr('r', 4)
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-opacity', 0.5)
			.attr('transform', d =>
				"translate(" + proj([
					d.Longitude,
					d.Latitude
				]) + ")"
			)
			.attr('fill', d => color(d['Degree of endangerment']))
			.attr('opacity', 0.5)
			.attr('id', d => "c_" + d['Degree of endangerment'].replace(/\s/g,'_') )
			.on('mouseover', function (d, i) {
				if (d3.select(this).attr('opacity') > 0) {
					d3.select(this).attr('opacity', 1);

					let tip = 'Name: ' + i['Name in English'] +
						"<br>Endangerment Status: " + i['Degree of endangerment'] +
						"<br>Speakers: " + (i['Number of speakers'] == "" ? "N/A" : i['Number of speakers']) +
						"<br>Countries Spoken: " + i['Countries']

					return tooltip.html(tip).style('visibility', 'visible');
				}
			})
			.on('mousemove', function(d) {
				if (d3.select(this).attr('opacity') > 0) {
					tooltip.style('top', (d.pageY + 20) + 'px').style('left', (d.pageX - 60) + 'px')
				}
			})
			.on('mouseout', function () {
				if (d3.select(this).attr('opacity') > 0) {
					tooltip.style('visibility', 'hidden');
					d3.select(this).attr('opacity', 0.5);
				}
			})

	// LEGEND
	map.selectAll('legend_dots')
		.data(labels)
		.enter()
		.append('circle')
			.attr('cx', width - 160)
			.attr('cy', (d, i) => 75 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
			.attr('r', 8)
			.attr('opacity', 0.5)
			.attr('id', d => 'legend_' + d.replace(/\s/g,'_'))
			.attr('fill', d => color(d))
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-opacity', 0.5)
			.attr('show', true)
			.on('click', function() {
				filter(d3.select(this), d3.select(this).attr('show') != 'true')
			})
			.on('mouseover', function() {
				d3.select(this).attr('opacity', 1);
			})
			.on('mouseout', function() {
				d3.select(this).attr('opacity', 0.5)
			})

	map.selectAll('legend_labels')
		.data(labels)
		.enter()
		.append('text')
			.attr('x', width - 145)
			.attr('y', (d, i) => 76.5 + i * 25) // 100 is where the first dot appears. 25 is the distance between dots
			.text(d => d)
			.attr('text-anchor', 'left')
			.style('alignment-baseline', 'middle')
			.attr('id', d => 'legend_text_' + d.replace(/\s/g,'_'))  
}


function createChart(data) {
	var map = d3.select('#map')

	var counts = {}
	labels.forEach(function (d) {
		counts[d] = 0
	})

	data.forEach(function (d) {
		counts[d['Degree of endangerment']] += 1
	});

	//ref: https://bl.ocks.org/d3noob/d805555ee892425cc582dcb245d4fc59

	var margin = {top: 20, right: 20, bottom: 50, left: 110},
		width = 960 - margin.left - margin.right,
		height = 520 - margin.top - margin.bottom;

	var y = d3.scaleBand()
		.range([0, height])
		.domain(labels)
		.padding(0.1);

	var x = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(Object.keys(counts).map(key => counts[key]))])

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr('id', 'chart')
		.append("g")
			.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");

	// append the rectangles for the bar chart
	svg.selectAll("rect")
		.data(Object.keys(counts))
		.enter()
		.append("rect")
			.attr("class", "bar")
			.attr("y", d => y(d) )
			.attr("height", y.bandwidth())
			.attr("width", d => x(counts[d]) )
			.attr('x', 1)
			.attr('fill', d => color(d))
			.attr('opacity', 0.5)
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-opacity', 0.5)
			.attr('id', d => d.replace(/\s/g,'_') )
			.on('mouseover', function () {
				if (lockedID == null) {
					highlight(d3.select(this))
				}
			})
			.on('click', function() {
				tID = d3.select(this).attr('id')
				if (lockedID != tID) {
					lockedID = tID
					highlight(d3.select(this))

					d3.select(this)
						.attr('opacity', 1)
				} else {
					lockedID = null
					d3.select(this).attr('opacity', 0.75);
				}
			})
			.on('mouseout', function () {
				if (lockedID == null) {
					svg.selectAll("rect")
						.attr('opacity', 0.5)
					
					labels.forEach(function(d) {
						dID = d.replace(/\s/g,'_')
						if (map.select('#legend_'+dID).attr('show') == 'true') {
							map.selectAll('#c_' + dID)
								.attr('opacity', 0.5)
						} else {
							map.selectAll('#c_' + dID)
								.attr('opacity', 0)
						}
					})
				}
			})

	// add the x Axis
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x));

	// add the y Axis
	svg.append("g")
	  .call(d3.axisLeft(y));
	  
	svg.append("text")             
	  .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
	  .style("text-anchor", "middle")
	  .text("Number of Languages");
} */
