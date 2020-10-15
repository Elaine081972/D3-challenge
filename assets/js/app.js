// Load data from data.csv
//d3.csv("./assets/data/data.csv").then(data => {

    //console.log(data);

var svgWidth = 750;
var svgHeight = 150;

var margin = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create a svg wrapper, append an SVG group that will hold the chart, and shift the latter by left
// and top margins
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("heigth", svgHeight);

var scatterGroup = svg. append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import csv data
d3.csv("./assets/data/data.csv").then(data => {
    
    // parse data/cast as numbers
    data.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([5, d3.max(data, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    // create circles
    var circlesGroup = scatterGroup.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "7")
    .attr("fill", "pink")
    .attr("opacity", 0.8)
   // .attr() for state abbreviations inside, need to look up..
    .attr("stroke", "black")
    .attr("stroke-width", 1);

    // create axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append  axes to the chart
    scatterGroup.append("g")
        .attr("transform", `translate(0, $height})`)
        .call(bottomAxis);

    scatterGroup.append("g")
        .call(leftAxis);




    






}).catch(error => console.log(error));
