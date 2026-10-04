d3.csv("data/W6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // convert to number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {
    // log processed data to console
    console.log(data);

    // call functions after data loaded
    drawHistogram(data);
    populateFilters(data);
    drawScatterplot(data); // 6.3
    createTooltip();       // 6.3
    handleMouseEvents();   // 6.3
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});