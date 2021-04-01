const xml = new XMLHttpRequest();
xml.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',true);
xml.send();

xml.onload = function() {
	// body...

	const json = JSON.parse(xml.responseText);
	console.log(json);

	const xData = json.monthlyVariance.map((el)=>{
		return el.year;
	});
	console.log(xData);
// data set to determine y value of the rect element
	const yData = json.monthlyVariance.map((el)=>{
		return el.month;
	});
	console.log(yData);
	let variance = json.monthlyVariance.map((el)=>el.variance);
	console.log(d3.max(variance));
	console.log(d3.min(variance));
	// SVG element attributes

	const width = 1200;
	const height = 800;
	const padding = 60;

//x Axis Data and scale
	const xScale = d3.scaleLinear().domain([d3.min(xData),d3.max(xData)]).range([padding,width-padding]);
	const xAxis = d3.axisBottom(xScale);

//y Axis Data and scale


	const yScale = d3.scaleTime()
   .domain([new Date(2000, 0, 1, 0), new Date(2000, 11, 1, 2)])
  .range([padding, height-270]);
  yScale.ticks(d3.timeMonth);
	const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")).tickSize(10,2).tickPadding(10);
	const yScale2 = d3.scaleLinear().domain([11,0]).range([padding,height-300]);



//adding heading 
	let heading = d3.select('#heatMap').append('div')
      					.append('h1')
      					.attr('id', 'title')
      					.attr('x',300)
      					.style('padding-left',300)
      					.text('Monthly Global Land-Surface Temperature');


//adding description to the heatmap

d3.select('#heatMap').append('div')
.append('h3').attr('id','description').style('padding-left',430).text('1753 - 2015: base temperature 8.66 C');      					

// Determining color for rect element

	const colors = {
		1 : '#53ea07',
		2 : '#beff05',
		3 : '#e4ff05',
		4 : '#fdc70c',
		5 : '#fdff05',
		6 : '#ffdb05',
		7 : '#ffdb05',
		8 : '#ff9c05',
		9 : '#ff9c05',
		10 : '#ff7605',
		11 : '#ff5105',
		12 : '#ff2b05',
		13 : '#ff0505'
	};

//creating svg element
	const svg = d3.select('#heatMap').append('svg')
				.attr('width',width)
				.attr('height',height)
				.style('fill','red');

//adding axes to the map

	svg.append('g')
		.attr('id','x-axis')
		.attr('transform',`translate(${padding},${height-padding-200})`)
		.call(xAxis);

	svg.append('g')
		.attr('id','y-axis')
		.attr('transform',`translate(${padding+60},10)`)
		.call(yAxis);

//Building rect element for dataset

	svg.selectAll('rect')
	.data(xData)
	.enter()
	.append('rect')
	.attr('class','cell')
	.attr('data-month',(d,i)=>json.monthlyVariance[i].month-1)
	.attr('data-year',(d,i)=>json.monthlyVariance[i].year)
	.attr('data-temp',(d,i)=>8.66-json.monthlyVariance[i].variance)
	.attr('height',42)
	.attr('width',7)
	.style('padding-left',padding)
	.attr('x',(d,i)=>xScale(xData[i])+60)
	//.attr('y',(d,i)=>40*(json.monthlyVariance[i].month-1)+padding)
	.attr('y',(d,i)=>yScale2(yData[i])+40)
	.style('fill',(d,i)=>{
		return colors[Math.floor(8.66+variance[i])]
	})		

}