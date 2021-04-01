

const xml = new XMLHttpRequest();
xml.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
xml.send();
xml.onload = function () {
	const json = JSON.parse(xml.responseText);
	let dataset = json['data'];
	console.log(dataset[0]);
	let dataX = dataset.map((el) => parseInt(el[0].split('-')[0]));

	var yearsDate = json.data.map(function (item) {
		return new Date(item[0]);
	});

	var xMax = new Date(d3.max(yearsDate));
	xMax.setMonth(xMax.getMonth() + 3);

	console.log(d3.max(dataX));
	let dataY = dataset.map(el => el[1]);
	console.log(d3.max(dataY));

	const w = 800;
	const h = 400;
	const padding = 60;
	const barW = w / 275;

	const xScale = d3.scaleTime().domain([d3.min(yearsDate), xMax]).range([0, w]);
	let yScale = d3.scaleLinear().domain([0, d3.max(dataY)]).range([h - padding, 0]);
	var linearScale = d3.scaleLinear().domain([0, d3.max(dataY)]).range([0, h - padding]);
	const xAxis = d3.axisBottom(xScale);
	let yAxis = d3.axisLeft(yScale);

	scaledGDP = dataY.map(function (item) {
		return linearScale(item);
	});
	var years = dataset.map(function (item) {
		var quarter;
		var temp = item[0].substring(5, 7);

		if (temp === '01') {
			quarter = 'Q1';
		} else if (temp === '04') {
			quarter = 'Q2';
		} else if (temp === '07') {
			quarter = 'Q3';
		} else if (temp === '10') {
			quarter = 'Q4';
		}

		return item[0].substring(0, 4) + ' ' + quarter;
	});
	console.log(typeof years[0]);
	console.log(yScale(d3.min(dataY)));

	const svg = d3.select('#bar-chart')
		.append('svg')
		.attr('width', w + 100)
		.attr('height', h + 60)
		.attr('class', 'container-fluid bg-dark');

	var tooltip = d3
		.select('#bar-chart')
		.append('div')
		.attr('id', 'tooltip')
		.style('opacity', 0);

	var overlay = d3
		.select('#bar-chart')
		.append('div')
		.attr('class', 'overlay')
		.style('opacity', 0);

	svg.append('g')
		.append('g')
		.call(xAxis)
		.attr('id', 'x-axis')
		.attr('transform', 'translate(60, 400)');

	svg.append('g')
		.append('g')
		.call(yAxis)
		.attr('id', 'y-axis')
		.attr('transform', 'translate(60, 60)');

	svg.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -300)
		.attr('y', 80)
		.text('Gross Domestic Product');

	svg.append('text')
		.attr('x', w / 2 - 100)
		.attr('y', h + 50)
		.text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
		.attr('class', 'info');


	svg.selectAll('rect')
		.data(scaledGDP)
		.enter()
		.append('rect')
		.attr('data-date', (d, i) => {
			return json.data[i][0]
		})
		.attr('data-gdp', (d, i) => {
			return json.data[i][1]
		})
		.attr('x', function (d, i) {
			return xScale(yearsDate[i]);
		})
		.attr('y', function (d) {
			return h - d;
		})
		.attr('width', barW)
		.attr('height', function (d) {
			return d;
		})
		.style('fill', '#33adff')
		.attr('transform', 'translate(60, 0)')
		.attr('class', 'bar')
		.on('mouseover', function (d,i) {
			d3.select(this).style('fill', 'white');
			overlay
				.transition()
				.duration(0)
				.style('height', d + 'px')
				.style('width', barW + 'px')
				.style('opacity', 0.9)
				.style('left', i * barW + 0 + 'px')
				.style('top', h - d + 'px')
				.style('transform', 'translateX(60px)');
			tooltip.transition().duration(200).style('opacity', 0.9);
			tooltip
				.html(function (d, i) {
					return `${d} ${dataY[i]} $Billion`
				})
				.attr('data-date', (d, i) => d)
				.style('left', i * barW + 30 + 'px')
				.style('top', h - 100 + 'px')
				.style('transform', 'translateX(60px)');
		})
		.on('mouseout', function () {
			d3.select(this)
				.style('fill', '#33adff');
			tooltip.transition().duration(200).style('opacity', 0);
			overlay.transition().duration(200).style('opacity', 0);


		});






}