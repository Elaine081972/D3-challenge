// Load data from data.csv
//d3.csv("./assets/data/data.csv").then(data => {

    //console.log(data);

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
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
        data.
    })
    






}).catch(error => console.log(error));
