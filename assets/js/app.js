// Load data from data.csv
//d3.csv("./assets/data/data.csv").then(data => {

    //console.log(data);

let svgWidth = 750;
let svgHeight = 500;

let margin = {
    top: 30,
    right: 40,
    bottom: 60,
    left: 80
    };

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;
// create a svg wrapper, append an SVG group that will hold the chart, and shift the latter by left
// and top margins
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let scatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import csv data
d3.csv("./assets/data/data.csv").then(data => {
    
    // parse data/cast as numbers
    data.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // create scale functions
    let xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty) + 2])
        .range([0, width])
        .nice();

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0])
        .nice();

        // create axis functions 
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append  axes to the chart
    scatterGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    scatterGroup.append("g")
        .call(leftAxis);


    // create circles
    let circlesGroup = scatterGroup.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "9")
    .attr("class", "stateCircle")
    // .attr("fill", "pink")
    // .attr("opacity", 0.8)
    // .attr() for state abbreviations inside, need to look up..
    // .attr("stroke", "black")
    // .attr("stroke-width", 1);
    
   
    // create axes labels
    scatterGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 5)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Lacks Healthcare (%)");

    scatterGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("class", "aText")
        .text("In Poverty (%)");

}).catch(error => console.log(error));
