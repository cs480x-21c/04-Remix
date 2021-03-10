Promise.all([
	d3.json("countries-50m.json"),
	d3.csv("data.csv")
]).then( ([world, data]) => {
		createMap(world, data)
	})


function createMap(world, data) {
	//var land = topojson.feature(world, world.objects.land);
	var countries = topojson.feature(world, world.objects.countries);

	var proj = d3.geoEqualEarth()
		.translate([500,300])
		.scale(170);

	var gpath = d3.geoPath()
		.projection(proj);

	var width = 1000,
		height = 700;

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll('path')
		.data(countries.features)
		.enter()
		.append('path')
			.attr('d', d => gpath(d))
			.attr('stroke-width', 1)
			.attr('stroke', '#252525')
			.attr('fill', 'white');

	console.log(data[0])

	color = d3.scaleOrdinal(d3.schemeOrRd[5]).domain([
		'Vulnerable',
		'Definitely endangered',
		'Severely endangered',
		'Critically endangered',
		'Extinct'
	])

	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
			.attr('r', 2)
			.attr('transform', d => 
				"translate(" + proj([
					d.Longitude, 
					d.Latitude
				]) + ")"
			)
			.attr('fill', d => color(d['Degree of endangerment']))

	
}
