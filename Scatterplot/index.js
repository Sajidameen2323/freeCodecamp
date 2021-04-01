const req = new XMLHttpRequest();
req.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
req.send();
req.onload = function(){
	const json = JSON.parse(req.responseText);
	const yDataT = json.map((d,i)=>{
		return d.Time
	});
	json.forEach(function (d) {
    d.Place = +d.Place;
    var parsedTime = d.Time.split(':');
    d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
  });
	const xData = json.map(function(el,i){
		return el.Year
	});
	const yData = json.map((d,i)=>{
		return d.Time
	});
	console.log(yDataT[0]);
	console.log(xData[0]);
	var timeFormat = d3.timeFormat('%M:%S');
	console.log(d3.max(yData));

	const w = 1000;
	const h = 600;
	var margin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60
  }
 	const padding = 60;
 	const xScale = d3.scaleLinear().domain([d3.min(xData)-1,d3.max(xData)+1]).range([padding,w-padding]);
 	const yScale = d3.scaleTime().domain(
    d3.extent(json, function (d) {
      return d.Time
    })
  ).range([60, h-60]);
 	const xAxis = d3.axisBottom(xScale);
 	const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);
 	var color = d3.scaleOrdinal(d3.schemeCategory10);



 	var div = d3
  		.select('body')
  		.append('div')
  		.attr('class', 'tooltip')
  		.attr('id', 'tooltip')
  		.style('fill','red')
  		.style('opacity', 0);

	const svg = d3.select('#graph')
				.append('svg')
				.attr('width',w)
				.attr('height',h)
				.attr('margin','10px')
				.attr('class', 'graph')
				.attr('padding','20px');
				//.style('background-color','rgba(256,256,256,0.7)');

	var tooltip = d3
		.select('svg')
		.append('text')
		.attr('id', 'tooltip')
		.attr('width',100)
		.attr('height',100)
		.style('opacity', 0);		

	var legendContainer = svg.append('g').attr('id', 'legend');

  	var legend = legendContainer
    	.selectAll('#legend')
    	.data(color.domain())
    	.enter()
    	.append('g')
    	.attr('class', 'legend-label')
    	.attr('transform', function (d, i) {
      		return 'translate(0,' + (h / 2 - i * 20) + ')';
    	});


     legend
    .append('rect')
    .attr('x', w - 18)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

    legend
    .append('text')
    .attr('x', w - 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text(function (d) {
      if (d) {
        return 'Riders with doping allegations';
      } else {
        return 'No doping allegations';
      }
    });

	svg.append('g')
	.attr('transform',`translate(0,${h-padding})`)
	.attr('id','x-axis')
	.call(xAxis);	

	svg.append('g')
	.attr('transform',`translate(60,0)`)
	.attr('id','y-axis')
	.call(yAxis);

	svg.selectAll('.dot')
	.data(json)
	.enter()
	.append('circle')
	.attr('class','dot')
	.attr('cx',d=>xScale(d.Year))
	.attr('cy',d=>yScale(d.Time))
	.attr('r',6)
	.attr('data-xvalue',d=>d.Year)
	.attr('data-yvalue',(d,i)=>d.Time.toISOString())
	.attr('id',d=>{return d.Year+' '+d.Time+' '+d.Doping})
	.style('fill',d=>{
		if (d.Doping != ''){
			return 'black'
		} else{
			return 'orange'
		}
	})
	.on('mouseover',function(e){
		console.log(e.target.cx["animVal"].value);
		div.style('opacity', 0.9);
		let xV = e.target.cx["animVal"].value;
		let yV = e.target.cy["animVal"].value;
		let txtV = e.target.id.split(' ');
		console.log(txtV);
		tooltip.append('rect').attr('x',60).attr('y',100).attr('width',100).attr('height',100).style('fill','red');
		tooltip.transition().duration(300).style('opacity', 0.9);
		tooltip.html(`${txtV[0]} ${txtV[1]}
			${txtV[2]} ${txtV[3]} ${txtV[4]} ${txtV[5]} ${txtV[10]} ${txtV[11]} ${txtV[12]} ${txtV[13]} ${txtV[14]} ${txtV[15]}`)
		.attr('width','50px')
		.attr('x',xV)
		.attr('y',yV-10)
		.attr('data-year',txtV[0])
		.style('font-size', 20)
		.style('font-family', 'monospace')
		.style('fill','black')
		.append('text')
		.text('testing');
		
		
	})
	.on('mouseout',function(d){
		tooltip.transition().duration(200).style('opacity', 0);
	});

	svg.append('text')
    .attr('x', '680px')
    .attr('y', '300px')
    .style('font-size', 20)
    .attr('transform','rotate(45)')
    .text('Time in Minutes')
    .style('fill','red');

      svg
    .append('text')
    .attr('id', 'title')
    .attr('x', w / 2)
    .attr('y', 0 - margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text('Doping in Professional Bicycle Racing');
}