d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year, // convert to number
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log("Loaded Line Chart Data:", data);
    drawLineChart(data);
});


const drawLineChart = data => {
    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x and y scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // ticks format as integers without commas
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    const leftAxis = d3.axisLeft(yScale);

    // x axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // y axis
    innerChart
        .append("g")
        .call(leftAxis);

    // y label
    innerChart
        .append("text")
        .text("Average Price ($/MWh)")
        .attr("x", -margin.left + 20)
        .attr("y", -10)
        .attr("text-anchor", "start")
        .style("font-size", "14px")
        .style("font-weight", "bold");

    // x label
    innerChart
        .append("text")
        .text("Year")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 35)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold");

    // draw scatter plot (circles for data points)
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "green");

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2);
};