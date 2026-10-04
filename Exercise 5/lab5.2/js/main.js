// Load the dataset and process it
d3.csv("data/Data_exercise 5.1.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,
        Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    // Log dataset to check data types
    console.log("Loaded Data:", data);

    // Sort data descending or ascending by energy consumption
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    
    // Pass sorted data to visualization function
    drawBarChart(data);
});

// Setup function to draw the bar chart
const drawBarChart = data => {
    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the SVG container for our chart
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create X and Y scales for vertical bar chart
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption)])
        .range([innerHeight, 0]);

    // Calculate X and Y axes
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    // Add X-axis to the inner chart group
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add Y-axis to the inner chart group
    innerChart
        .append("g")
        .call(leftAxis);

    // Add Y-axis label
    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start");

    // Draw bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("fill", "green");
};