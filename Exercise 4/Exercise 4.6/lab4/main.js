const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 1000")
    .style("border", "1px solid black");


    
function processDataset(data) {
    // Log dataset length and metrics
    console.log("Dataset Row Count:", data.length);
    console.log("Maximum Count:", d3.max(data, d => d.count));
    console.log("Minimum Count:", d3.min(data, d => d.count));
    console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

    // Sort data descending by count
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted Data:", data);

    // Pass sorted data to visualization renderer function
    drawBarChart(data);
}



// Call drawBarChart inside the data load promise
d3.csv("tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    // Sort data before drawing
    data.sort((a, b) => b.count - a.count);
    
    // Pass data to visualization function
    drawBarChart(data);
});



const drawBarChart = data => {

    const xScale = d3.scaleLinear()
  .domain([0, 1200])
  .range([100, 450]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 1000]) // Match your updated viewBox height
        .padding(0.1);    // Adds spacing between bars

    const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

barAndLabel
    .append("rect")
    .attr("class", d => `bar-${d.count}`)
    .attr("x", 100)                      // Aligns with the updated xScale start
    .attr("y", 0)                        // Reset local Y position to 0 inside the group
    .attr("width", d => xScale(d.count) - 100) // Calculates bar width from offset start
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

    barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 95)                       // Just to the left of the bar's x=100 start
    .attr("y", yScale.bandwidth() / 2)   // Vertically centered inside the bar
    .attr("dy", "0.35em")                // Fine-tune vertical alignment
    .attr("text-anchor", "end")          // Right-aligns text to coordinate x=95
    .style("font-size", "12px")
    .style("font-family", "sans-serif");

    barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 5) // Positioned 5px past the right end of the bar
    .attr("y", yScale.bandwidth() / 2)   // Vertically centered inside the bar
    .attr("dy", "0.35em")
    .style("font-size", "11px")
    .style("font-family", "sans-serif")
    .style("fill", "#333");
};