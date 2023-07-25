looker.plugins.visualizations.add({
  id: 'custom_combined_chart',
  label: 'Custom Combined Chart',
  options: {
    showLineChart: {
      type: 'boolean',
      label: 'Show Line Chart',
      default: true,
    },
    showBarChart: {
      type: 'boolean',
      label: 'Show Bar Chart',
      default: true,
    },
    lineColor: {
      type: 'string',
      label: 'Line Color',
      default: 'green', // Set line color to green by default
    },
    barColor: {
      type: 'string',
      label: 'Bar Color',
      default: 'purple', // Set bar color to purple by default
    },
    xAxisLabel: {
      type: 'string',
      label: 'X-Axis Label',
      default: '',
    },
    yAxisLabel: {
      type: 'string',
      label: 'Y-Axis Label',
      default: '',
    },
  },
  create: function (element, config) {
    // Create a container for the chart with CSS style to center the content
    element.innerHTML = '<div id="custom-combined-chart" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Remove any existing chart before creating a new one
    d3.select('#custom-combined-chart').selectAll('*').remove();

    // Get the dimensions of the parent container
    const parentWidth = element.clientWidth;
    const parentHeight = element.clientHeight;

    // Calculate the number of data points in the X-axis
    const numDataPoints = data.length;

    // Calculate the number of bars in the bar chart (for multiple measures, we'll use the first measure)
    const measures = queryResponse.fields.measure_like;
    const numBars = measures.length > 0 ? data.length : 0;

    // Calculate the desired width and height of the chart based on the number of data points and bars
    const width = Math.max(numDataPoints * 60, parentWidth);
    const height = Math.max(numBars * 60, parentHeight);

    const margin = { top: 40, right: 20, bottom: 80, left: 60 }; // Increased bottom margin for x-axis label and legend

    // Extract dimensions and measures from queryResponse
    const dimensions = queryResponse.fields.dimension_like;
    const defaultXAxisLabel = dimensions.length > 0 ? dimensions[0].label : 'X-Axis'; // Set default x-axis label to the first dimension name
    const defaultYAxisLabel = measures.length > 0 ? measures[0].label : 'Y-Axis'; // Set default y-axis label to the measure name

    // Use default labels if not provided in options
    config.xAxisLabel = config.xAxisLabel || defaultXAxisLabel;
    config.yAxisLabel = config.yAxisLabel || defaultYAxisLabel;

    // Extract data for the line chart
    const lineData = data.map(row => ({
      x: dimensions.length >= 1 ? getDimensionLabel(row, dimensions) : 'N/A',
      y: row[measures[0].name].value,
    }));

    // Extract data for the bar chart (for multiple measures, we'll use the first measure)
    const barData = data.map(row => ({
      x: dimensions.length >= 1 ? getDimensionLabel(row, dimensions) : 'N/A',
      y: row[measures[0].name].value,
    }));

    // Check if any dimension is used as a measure, and if so, exclude it from the x-axis dimensions
    const xDimensions = dimensions.filter(dimension => dimension.name !== measures[0].name);

    // Calculate the chart's width and height based on whether the bar chart is displayed
    const chartWidth = config.showBarChart ? width - margin.left - margin.right : width;
    const chartHeight = height - margin.top - margin.bottom;

    // Calculate the required translation to center the chart within the SVG
    const translateX = (width - chartWidth) / 2 + margin.left;

    const svg = d3.select('#custom-combined-chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`) // Added viewBox to make it responsive
      .attr('preserveAspectRatio', 'xMidYMid meet'); // Added preserveAspectRatio to maintain aspect ratio

    // Create scales and axes for both charts
    const xScale = d3.scaleBand()
      .domain(lineData.map(d => d.x))
      .range([0, chartWidth])
      .padding(0.1);

    const yLineScale = d3.scaleLinear()
      .domain([0, d3.max(lineData, d => d.y)])
      .range([chartHeight, 0]);

    const yBarScale = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.y)])
      .range([chartHeight, 0]);

    // Conditionally render the bar chart based on the configuration option
    if (config.showBarChart) {
      const barChart = svg.append('g')
        .attr('class', 'bar-chart')
        .attr('transform', `translate(${translateX},${margin.top})`);

      barChart.selectAll('.bar')
        .data(barData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yBarScale(d.y))
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yBarScale(d.y))
        .attr('fill', config.barColor) // Use the selected bar color from options
        .on('mouseover', function () {
          // Add any desired interactivity for the bar chart here
        })
        .on('mouseout', function () {
          // Add any desired interactivity for the bar chart here
        });

      const xAxis = barChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45) translate(-10, -10)')
        .style('fill', 'black'); // Set x-axis labels color to black

      const yAxis = barChart.append('g')
        .call(d3.axisLeft(yBarScale))
        .style('fill', 'black'); // Set y-axis labels color to black

      // Add x-axis label
      barChart.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('fill', 'black') // Set x-axis label color to black
        .text(config.xAxisLabel);

      // Hide y-axis line and ticks
      xAxis.select('.domain').remove();
      xAxis.selectAll('.tick line').remove();
    }

    // Conditionally render the line chart based on the configuration option
    if (config.showLineChart) {
      const lineChart = svg.append('g')
        .attr('class', 'line-chart')
        .attr('transform', `translate(${translateX},${margin.top})`);

      const line = d3.line()
        .x(d => xScale(d.x) + xScale.bandwidth() / 2)
        .y(d => yLineScale(d.y));

      lineChart.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', config.lineColor) // Use the selected line color from options
        .attr('stroke-width', 2)
        .attr('d', line);

    // Add axes for the line chart
      const xAxis = lineChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45) translate(-10, -10)')
        .style('fill', 'black'); // Set x-axis labels color to black

      const yAxis = lineChart.append('g')
        .call(d3.axisLeft(yLineScale))
        .style('fill', 'black'); // Set y-axis labels color to black

      // Add y-axis label
      lineChart.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -margin.left + 10)
        .attr('text-anchor', 'middle')
        .style('fill', 'black') // Set y-axis label color to black
        .text(config.yAxisLabel);

      // Hide xAxis line and ticks
      yAxis.select('.domain').remove();
      yAxis.selectAll('.tick line').remove();

    }

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'column-legend')
      .attr('transform', `translate(${width - margin.right - 10},${margin.top})`);

    // Line chart legend item
    if (config.showLineChart) {
      const lineLegend = legend.append('g')
        .attr('class', 'line-legend')
        .attr('transform', `translate(0, 0)`);

      lineLegend.append('line')
        .attr('x1', -15)
        .attr('y1', 0)
        .attr('x2', 20)
        .attr('y2', 0)
        .attr('stroke', config.lineColor) // Use the selected line color from options
        .attr('stroke-width', 2);

      lineLegend.append('text')
        .attr('x', 25)
        .attr('y', 5)
        .text(dimensions.length > 0 ? dimensions[0].label : 'Dimension')
        .attr('font-size', 12)
        .style('fill', 'black'); // Set legend text color to black
    }

    // Bar chart legend item
    if (config.showBarChart) {
      const barLegend = legend.append('g')
        .attr('class', 'bar-legend')
        .attr('transform', `translate(0, ${20})`); // Set initial position for the legend items

      const legendItems = barLegend.selectAll('.legend-item')
        .data(measures)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`); // Position each legend item vertically

      legendItems.append('rect')
        .attr('x', -15)
        .attr('y', -10)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', (d, i) => config.barColor) // Use the selected bar color from options
        .style('fill-opacity', 0.7);

      legendItems.append('text')
        .attr('x', 25)
        .attr('y', -5)
        .text(d => d.label)
        .attr('font-size', 12)
        .style('fill', 'black'); // Set legend text color to black
    }
  },
});

// Helper function to get dimension label
function getDimensionLabel(row, dimensions) {
  return dimensions.map(dimension => row[dimension.name].value).join(' - ');
}
