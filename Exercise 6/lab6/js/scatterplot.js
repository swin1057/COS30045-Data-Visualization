const drawScatterplot = (data) => {
    // dimensions and margins of chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // create inner chart group with margin
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // set color scale domain and range
    colorScale
        .domain(data.map(d => d.screenTech)) // get unique screenTech value
        .range(d3.schemeCategory10); // predefined color scheme

    // calculate max values for scales
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // set domains and ranges
    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // circles for scatterplot
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5); // Make circles less opaque to see overlapping

    // x axis
    const xAxisS = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxisS);

    // y axis
    const yAxisS = d3.axisLeft(yScaleS);
    innerChartS.append("g")
        .call(yAxisS);

    // X label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // y label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // legend for color scale
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`); // position legend

    // loop through color scale domain to create legend entries
    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`); // space rows vertically

        // colored rectangle for each screenTech
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // text next to rectangle
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech); // display screenTech value
    });
};