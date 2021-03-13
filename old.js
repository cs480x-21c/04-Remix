// https://www.reddit.com/r/dataisbeautiful/comments/m0z52s/oc_today_almost_half_of_the_6900_languages_spoken/ <br>
// https://www.kaggle.com/the-guardian/extinct-languages

Promise.all([
	d3.json("countries-50m.json"),
	d3.csv("./data/cleaned_data.csv")
]).then(([world, data]) => {
	createMap(world, data)
	createChart(data)
})

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
}


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
}
