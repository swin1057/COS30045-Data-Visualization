const drawHistogram = (data) => {
    // dimension and margin of chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // responsive SVG

    // inner chart group with margin
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // bins for data set
    const bins = binGenerator(data);
    console.log("Generated Bins:", bins);

    // calculate min max energy consumption value to set xScale domain
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    // calculate max length of bins to set yScale domain
    const binsMaxLength = d3.max(bins, d => d.length);
    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // set domain and range
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // use nice() round y axis value

    // draw histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) // stroke color gap bars
        .attr("stroke-width", 2);

    // x axis
    const xAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);

    // y axis
    const yAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(yAxis);

    // x label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Labeled Energy Consumption (kWh/year)");

    // y label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Frequency");
};