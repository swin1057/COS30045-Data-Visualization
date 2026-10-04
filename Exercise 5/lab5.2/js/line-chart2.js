// Load the electricity spot prices dataset
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year, 
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log("Loaded Line Chart Data:", data);
    drawLineChart(data);
});

// Setup function to draw the enhanced area/line chart
const drawLineChart = data => {
    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 170, bottom: 40, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the SVG container for our line chart
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create X and Y scales using continuous linear scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    const leftAxis = d3.axisLeft(yScale);

    // Append X-axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Append Y-axis
    innerChart
        .append("g")
        .call(leftAxis);

    // Add Y-axis label
    innerChart
        .append("text")
        .text("Average Price ($ per MWh)")
        .attr("x", -margin.left + 10)
        .attr("y", -10)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight", "bold");

    // Add X-axis label
    innerChart
        .append("text")
        .text("Year")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 35)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold");

    // 1. TURNING IT INTO AN AREA CHART:
    // Create an area generator instead of just a line generator
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(innerHeight) // Bottom baseline of the chart
        .y1(d => yScale(d.averagePrice)) // Top edge matching data values
        .curve(d3.curveStep); // 2. CHANGE CURVE STYLE (e.g., step curve style from lab examples)

    // Append the filled area path
    innerChart
        .append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", areaGenerator)
        .attr("fill", "green")
        .attr("opacity", 0.25); // Transparent green fill

    // 3. DRAW THE LINE OVER THE AREA (using same step curve)
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveStep);

    innerChart
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

    // 4. ADDING A LABEL TO THE LINE:
    // Place a descriptive text label near the final data point on the right
    const lastDataPoint = data[data.length - 1];
    
    innerChart
        .append("text")
        .text("Average Price ($ per MWh)")
        .attr("x", xScale(lastDataPoint.year) + 10)
        .attr("y", yScale(lastDataPoint.averagePrice))
        .attr("dy", "0.35em")
        .style("font-size", "11px")
        .style("fill", "green")
        .style("font-weight", "bold");

    // (Note: Circles are omitted here to match the clean area/step look, but you can re-add them if preferred!)
};