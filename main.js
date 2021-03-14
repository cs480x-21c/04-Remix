//jshint strict: false
/*jshint esversion: 6 */


/*--- True Constants ---*/
const svg = d3.select("#bar-graph-plane");
const othersvg = d3.select("#line-graph-plane");
const data = {};




/*--- Helper Functions ---*/
// Scales bars to make them fit horizontally




/*--- Constants Dependent Upon Functions ---*/
/*const axisX = d3.axisBottom(horizontalScale);
const axisY = d3.axisLeft(verticalScale);*/

/*--- Variables ---*/
//below adjusts border width with respect to the #upper-container div
var el = $('.basic-border');
var w = el.width() * 0.002;
el.css("border-width",  w + "px");



/*--- Main ---*/


d3.csv("world-per-day-cleaned.csv", function(row) {
    return {
        date: row.Date,
        cases: +row.USCasesPerDay,
        increment: +row.SimpleCounter,
        worldCases: +row.WorldCasesPerDayNoAmerica
    };
})

.then(function(dataset){
    data.america = dataset;
    currentbar = null;
    draw();
    drawAxes();
    draw2();

});


var dispatch = d3.dispatch("highlightEvent", "unhighlightEvent", "u1on", "u1off", "hello");

dispatch
    .on("highlightEvent", function(){
        d3.select(this)
            .style("fill", "red");
        /*d3.selectAll('rect').dispatch("hello");*/
    })
    .on("unhighlightEvent.bar", function(){
        d3.select(this)
            .style("fill","lightblue");
    })
    .on("u1on", function(){
        console.log(this);
    })
;

function drawAxes(){
    const min_data = 0, xmax_data = 415, ymax_data = 270000;
    let xScale = d3.scaleLinear()
                   .domain([min_data, xmax_data])
                   .range([0, $('#bar-graph-plane').width()]);

    let yScale = d3.scaleLinear()
                    .domain([ymax_data, min_data])
                    .range([0, $('#bar-graph-plane').height() ]);


    let yAxisGenerator = d3.axisRight(yScale);
    yAxisGenerator.ticks(13);
    yAxisGenerator.tickValues([
        20000,
        40000,
        60000,
        80000,
        100000,
        120000,
        140000,
        160000,
        180000,
        200000,
        220000,
        240000,
        260000
    ]);
    let ytickLabels = [
        '20k',
        '40k',
        '60k',
        '80k',
        '100k',
        '120k',
        '140k',
        '160k',
        '180k',
        '200k',
        '220k',
        '240k',
        '260k'
    ];
    yAxisGenerator.tickFormat((d,i) => ytickLabels[i]);

    let yAxis = svg.append("g")
                .call(yAxisGenerator);
    yAxis.select(".domain").remove();
    yAxis.selectAll(".tick")
        .each(function(d){
            const entry = d3.select(this);
            const line = entry.selectAll("line");
            const text = entry.selectAll("text");
            line
                .attr("x2",$('#bar-graph-plane').height() - 10)
                .attr("transform",`translate(${28},${0})`)
                .attr("class","background-grid")
                .attr("pointer-events","none")
                ;
            text
                .attr("font-size","13")
                .attr("transform",`translate(${-9},${0})`)
                .attr("pointer-events","none");
        });


    let xAxisGenerator = d3.axisBottom(xScale);

    // setting up the ticks - need to be manually input
    xAxisGenerator.ticks(13);
    xAxisGenerator.tickValues([40,71,101,132,162,193,224,254,285,315,346,377,405]);
    let xtickLabels = [
        '3/1/2020',
        '4/1/2020',
        '5/1/2020',
        '6/1/2020',
        '7/1/2020',
        '8/1/2020',
        '9/1/2020',
        '10/1/2020',
        '11/1/2020',
        '12/1/2020',
        '1/1/2021',
        '2/1/2021',
        '3/1/2021'
    ];
    xAxisGenerator.tickFormat((d,i) => xtickLabels[i]);
    xAxisGenerator.tickSize(-$('#bar-graph-plane').height());


    let xAxis =  svg.append("g").call(xAxisGenerator);


    xAxis.selectAll(".tick line")
        .attr("class","background-grid")
        .each(function(d,i){
            if(i & 1){
                const entry = d3.select(this)
                    .attr("transform",`translate(${0},${-15})`);
            }
        });

    xAxis.selectAll(".tick text")
        .each(function(d,i){
            if(i & 1){
                const entry = d3.select(this)
                    .attr("transform", `translate(${-7},${-15})`)
                    .attr("pointer-events","none");
            }
            else{
                const entry = d3.select(this)
                    .attr("transform",`translate(${-7},${0})`)
                    .attr("pointer-events","none");
            }
        })
        .attr("font-size", "13")
        .style('fill', 'black');
    xAxis.attr("transform",`translate(${0},${$('#bar-graph-plane').height() - 15})`);

    xAxis.select(".domain").remove();

}


function draw() {

    svg.selectAll("rect.bar2")
        .data(data.america).join("rect").attr("class", "bar2", "a")

        .each(function (d, i) {
            var yContain = $('#bar-graph-plane').height();
            //scales to make the data fit in the svg
            const verticalScale = d3.scaleLinear()
                .domain([0, 270000])
                .range([0, $('#bar-graph-plane').height()]);
            // Width of bars is slightly less than their percentage of the svg
            const barWidth = (($('#bar-graph-plane').width()) / 415) - 0.004;

            function horizontalScale(num) {
                return num * barWidth;
            }

            const entry = d3.select(this);



            entry
                //accounts for moving the bars over
                .attr("x", horizontalScale(i))
                //shifts the bars from the top of the plane to the bottom
                .attr("y", (yContain - verticalScale(d.cases)))
                //border attribute to overwrite the jquery
                .attr("border-style", "none")
                //height is equal to the number of COVID cases on that day
                .attr("height", verticalScale(d.cases))
                .attr("width", barWidth)
                .on("mouseover", function () {
                    dispatch.call("hello",i);
                })
                ;
        });
}
function draw2(){
    othersvg.selectAll("rect.bar")
        .data(data.america).join("rect").attr("class","bar","a")

        .each(function(d,i){
            var yContain = $('#bar-graph-plane').height();
            //scales to make the data fit in the svg
            const verticalScale2 = d3.scaleLinear()
                .domain([0,1500000])
                .range([0,$('#bar-graph-plane').height()]);
            // Width of bars is slightly less than their percentage of the svg
            const barWidth = (($('#bar-graph-plane').width())/415) - 0.004;

            function horizontalScale(num){
                return num * barWidth;
            }

            const entry = d3.select(this);

            entry
                //accounts for moving the bars over
                .attr("x", horizontalScale(i ))
                //shifts the bars from the top of the plane to the bottom
                .attr("y", (yContain - verticalScale2((d.worldCases))))
                //border attribute to overwrite the jquery
                .attr("border-style", "none")
                //height is equal to the number of COVID cases on that day
                .attr("height", verticalScale2(d.worldCases))
                .attr("width", barWidth)
                .on("mouseover",function(){
                    dispatch.call("hello",i);
                });
    });

    othersvg.selectAll("rect.bar2")
        .data(data.america).join("rect").attr("class","bar2","a")

        .each(function(d,i) {
            var yContain = $('#bar-graph-plane').height();
            //scales to make the data fit in the svg
            const verticalScale2 = d3.scaleLinear()
                .domain([0, 1400000])
                .range([0, $('#bar-graph-plane').height()]);
            // Width of bars is slightly less than their percentage of the svg
            const barWidth = (($('#bar-graph-plane').width()) / 415) - 0.004;

            function horizontalScale(num) {
                return num * barWidth;
            }

            const entry = d3.select(this);

            entry
                //accounts for moving the bars over
                .attr("x", horizontalScale(i))
                //shifts the bars from the top of the plane to the bottom
                .attr("y", (yContain - verticalScale2((d.cases))))
                //border attribute to overwrite the jquery
                .attr("border-style", "none")
                //height is equal to the number of COVID cases on that day
                .attr("height", verticalScale2(d.cases))
                .attr("width", barWidth)
                .style("fill","transparent")
                .attr("pointer-events","none");



    });
}

function highlighter(i,d,entry) {
    entry.style("fill", "lightblue");
    boxDraw(d.date);
    currentbar = i;
    dispatch.call("hello",i);
    return currentbar;
}


dispatch.on("hello", function(){
    temp = parseInt(this);
    othersvg.selectAll("rect.bar2")
        .data(data.america)
        .each(function(d,i){
            if(i === temp){
                d3.select(this).style("fill","red");
            }
            else{
                d3.select(this).style("fill","transparent");
            }
        });
    svg.selectAll("rect.bar2")
        .data(data.america)
        .each(function(d,i){
            if(i === temp){
                d3.select(this).style("fill","red");
            }
            else{
                d3.select(this).style("fill","lightblue");
            }
        });

});
