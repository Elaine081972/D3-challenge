// Load data from data.csv
//d3.csv("./assets/data/data.csv").then(data => {
    //console.log(data);

//
d3.select(window).on("resize", handleResize);

// when the browser loads, loadChart() is called
loadChart();

// if there is already an svg container on the page, remove it and reload the chart
function handleResize() {
    let svgArea = d3.select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
        loadChart();
    }
}
// loadchart () allow for the svg to be dependent on the window size and allows for more responsiveness depending on browser size/changes
function loadChart() {

// define svg dimensions
let svgWidth = window.innerWidth - 400;
let svgHeight = window.innerHeight - 400;

// define margins 
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
        .domain([5, d3.max(data, d => d.healthcare)])
        .range([height, 0])
        .nice();

    // create axis functions 
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append axes to the chart
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
    .attr("r", "11")
    .attr("class", "stateCircle");

    // create state abbreviation text
    let circlesAbbr = scatterGroup.selectAll()
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .text(d => d.abbr)     
        .attr("class", "stateText");

    // initialize tool tip
    let toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(d => `${d.state}<br>Poverty: ${d.poverty} %<br>Lack Healthcare: ${d.healthcare} %`);

    // create tooltip in the chart
    scatterGroup.call(toolTip);

    // create event listeners to display and hide the tooltip
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })
    // on mouseout event
     .on("mouseout", function(data){
        toolTip.hide(data);
     });

    // create  y and x axes labels
    scatterGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Lacks Healthcare (%)");

    scatterGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("class", "aText")
        .text("In Poverty (%)");

}).catch(error => console.log(error));

}