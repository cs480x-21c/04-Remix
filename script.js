// https://www.reddit.com/r/dataisbeautiful/comments/m0z52s/oc_today_almost_half_of_the_6900_languages_spoken/ <br>
// https://www.kaggle.com/the-guardian/extinct-languages

var labels = [
	'Vulnerable',
	'Definitely endangered',
	'Severely endangered',
	'Critically endangered',
	'Extinct'
]

var mapSVG = null
var chartSVG = null
var showLangs = false

Promise.all([
	d3.json("./data/countries-50m.json"),
	d3.csv("./data/Country_data.csv"),
	d3.csv("./data/Totals.csv"),
	d3.csv("./data/Pivoted_Data.csv")
]).then(([world, data, totals, fullData]) => {
	createMap(world, data, totals, fullData)
	mapSVG = d3.select("body").select('#map')
	colorMap(data)
	createChart(data, totals)
	chartSVG = d3.select('body').select("#chart")
})



function clean(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f\s.']/g, "")
}


function createMap(world, data, totals, fullData) {
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

	let tooltip = d3.select('body') //ref: http://bl.ocks.org/biovisualize/1016860
		.append('div')
			.style('position', 'absolute')
			.style('visibility', 'hidden')
			.style('border', '1px solid black')
			.style('background-color', 'white')
			.style('padding', '2px')

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
					map.selectAll('path')
						.attr('opacity', 0.5)
					d3.select(this).attr('opacity', 1)
					createChart(data, data.filter(d => d.Country == i.properties.name))
				}

				let tip = i.properties.name + "<br>"

				if (showLangs) {
					fullData.filter(v => v.Country == i.properties.name).forEach(function(v) {
						tip += v.Name + ": " + v.Status + "<br>"
					})
					
				}
				tooltip.html(tip).style('visibility', 'visible');
			})
			.on('mousemove', function(d) {
				if (d3.select(this).attr('opacity') > 0) {
					tooltip.style('top', (d.pageY + 20) + 'px').style('left', (d.pageX) + 'px')
				}
			})
			.on('mouseout', function() {
				tooltip.style('visibility', 'hidden');
				map.selectAll('path')
					.attr('opacity', 0.75)
				createChart(data, totals)
			})
			.on('click', function(d, i) {
				showLangs = !showLangs
				var tip = i.properties.name + "<br>"
				if (showLangs) {
					fullData.filter(v => v.Country == i.properties.name).forEach(function(v) {
						tip += v.Name + ": " + v.Status + "<br>"
					})
				}
				tooltip.html(tip)
			})
}

function colorMap(data, status='TOTAL') {
	var cColor = d3.scaleSequential(d3.interpolatePlasma)
		.domain([1, d3.max(data.filter(d => d.Status == status).map(d => parseInt(d.Languages)))])

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

	// ref: https://d3-legend.susielu.com/
	var legend = d3.legendColor()
		.scale(cColor)
		.title('Languages')
	
	mapSVG.call(legend)
		
	mapSVG.select('.legendCells')
		.attr('transform', "translate(1500, 100)")

	mapSVG.selectAll('.swatch')
		.attr('stroke-width', 1)
		.attr('stroke', '#252525')
	
	mapSVG.select('.legendTitle')
		.attr('transform', "translate(1500, 90)")
		.attr('stroke-width', 1)
		.attr('stroke', '#252525') //this is a hack to make it bold lol

	mapSVG.selectAll('.swatch')
		.attr('opacity', 0.75)
}


function createChart(data, totals) {
	var color = d3.scaleOrdinal()
	.range([
		'#C8F55F',
		'#FFD000',
		'#EB8C00',
		'#FF4600',
		'#F50033'
	])
	.domain(labels)
	
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
			.attr('opacity', 0.75)
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-opacity', 0.75)
			.attr('id', d => clean(d.Status) +"_bar")
			.on('mouseover', function(d, i) {
				colorMap(data, i.Status)
				chart.selectAll('rect')
					.attr('opacity', 0.5)
				d3.select(this).attr('opacity', 1)
			})
			.on('mouseout', function() {
				colorMap(data)
				chart.selectAll('rect').attr('opacity', 0.75)
			})

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
