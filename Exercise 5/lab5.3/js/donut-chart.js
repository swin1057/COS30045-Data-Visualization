d3.csv("data/Data_exercise 5.3.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category,
        Count: +d.Count
    };
}).then(data => {
    console.log("Loaded Donut Chart Data:", data);
    drawDonutChart(data);
});


const drawDonutChart = data => {
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // leave some padding

    // create color scale using ordinal scale and d3 schemeSet2 category colors
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // calculate angle for each slice
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // disable sorting to maintain original order

    // set up arcs (inner and outer radius for donut)
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1);

    // SVG container for donut chart
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // bind data and create donut chart arcs
    const arcGroup = innerChart
        .selectAll(".arc")
        .data(pie(data))
        .join("g")
        .attr("class", "arc");

    // append path element for the slice
    arcGroup.append("path")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // add category label inside each slice
    arcGroup.append("text")
        .text(d => d.data.Screensize_Category)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#000");
};