const populateFilters = (data) => {
    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };

    // filter buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            // update isActive state for all filters
            filters_screen.forEach(f => {
                f.isActive = (f.id === d.id);
            });

            // update button class dynamically
            d3.select("#filters_screen")
                .selectAll(".filter")
                .classed("active", f => f.isActive);

            // trigger histogram update with filter id and data
            updateHistogram(d.id, data);
        });
};

const createTooltip = (data) => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // tooltip text
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

const handleMouseEvents = () => {
    // select all circles in scatterplot and attach mouse enter/leave listener
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // pdate  text in tooltip with screen size
            d3.select(".tooltip text")
                .text(d.screenSize);

            // extract cx cy coordinates from target circle
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // position and smoothly transition tooltip appearance
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // hide tooltip and move it out when mouse leaves
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};