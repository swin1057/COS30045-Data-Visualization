// dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// colors accessible globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// set up scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // accessor for energyConsumption

// 6.2 array of filter options
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

//6.3
// set inner chart variable scatterplot
let innerChartS;

// tooltip dimensions
const tooltipWidth = 65;
const tooltipHeight = 32;

// scatterplot scales and color scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();