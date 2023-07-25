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
    element.innerHTML = '<div id="custom-combined-chart" style="display: flex; justify-content: center; align-items: center;"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Remove any existing chart before creating a new one
    d3.select('#custom-combined-chart').selectAll('*').remove();

    const width = 600; // Adjust the desired width of the SVG
    const height = 400; // Adjust the desired height of the SVG
    const margin = { top: 40, right: 20, bottom: 80, left: 60 }; // Increased bottom margin for x-axis label and legend

    // Extract dimensions and measures from queryResponse
    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Set default x-axis label to the first dimension name
    const defaultXAxisLabel = dimensions.length > 0 ? dimensions[0].label_short : 'X-Axis';

    // Set default y-axis label to the measure name
    const defaultYAxisLabel = measures.length > 0 ? measures[0].label_short : 'Y-Axis';

    // Use default labels if not provided in options
    config.xAxisLabel = config.xAxisLabel || defaultXAxisLabel;
    config.yAxisLabel = config.yAxisLabel || defaultYAxisLabel;

    // Check if there are any measure fields selected
    const hasMeasureFields = measures.length > 0;

    // If there are no measure fields, find the first dimension that contains integer data and use it as Y-axis
    if (!hasMeasureFields) {
      for (const dimension of dimensions) {
        const values = data.map(row => row[dimension.name].value);
        const allIntegers = values.every(value => Number.isInteger(value));
        if (allIntegers) {
          // Use this dimension as Y-axis
          measures.push(dimension);
          break;
        }
      }
    }

    // Extract data for the line chart
    const lineData = data.map(row => ({
      x: dimensions.length >= 1 ? getDimensionLabel(row, dimensions) : 'N/A',
      y: hasMeasureFields ? row[measures[0].name].value : row[dimensions[0].name].value, // Use the first measure if available, else use the first numeric dimension as Y-axis
      dimensions: getDimensionDetails(row, dimensions),
      measures: hasMeasureFields ? getMeasureDetails(row, measures) : [],
    }));

    // Extract data for the bar chart (for multiple measures, we'll use the first measure)
    const barData = data.map(row => ({
      x: dimensions.length >= 1 ? getDimensionLabel(row, dimensions) : 'N/A',
      y: hasMeasureFields ? row[measures[0].name].value : row[dimensions[0].name].value, // Use the first measure if available, else use the first numeric dimension as Y-axis
      dimensions: getDimensionDetails(row, dimensions),
      measures: hasMeasureFields ? getMeasureDetails(row, measures) : [],
    }));

    // Calculate the chart's width and height based on whether the bar chart is displayed
    const chartWidth = config.showBarChart ? width - margin.left - margin.right : width;
    const chartHeight = height - margin.top - margin.bottom;

    // Calculate the required translation to center the chart within the SVG
    const translateX = (width - chartWidth) / 2 + margin.left;

    const svg = d3.select('#custom-combined-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

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

    // Add tooltip div for displaying values on hover
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(255, 255, 255, 0.9)')
      .style('border', '1px solid #ccc')
      .style('padding', '8px')
      .style('font-size', '14px');

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
        .on('mouseover', function (event, d) {
          tooltip.style('visibility', 'visible')
            .html(`<strong>${dimensions.length === 3 ? 'Dimension 1 - Dimension 2 - Dimension 3' : dimensions.length === 2 ? 'Dimension 1 - Dimension 2' : 'Dimension 1'}: </strong>${d.x}<br><strong>${hasMeasureFields ? measures[0].name : 'Y-Axis'}: </strong>${d.y}`)
            .style('left', (event.pageX + 10) + 'px') // Add a small offset to avoid hiding the tooltip
            .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        });

      // Add axes for the bar chart
      barChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45) translate(-10, -10)');

      barChart.append('g')
        .call(d3.axisLeft(yBarScale));

      // Add x-axis label
      barChart.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .text(config.xAxisLabel);
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
      lineChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45) translate(-10, -10)');

      lineChart.append('g')
        .call(d3.axisLeft(yLineScale));

      // Add y-axis label
      lineChart.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -margin.left + 10)
        .attr('text-anchor', 'middle')
        .text(config.yAxisLabel);
    }

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right - 10},${margin.top})`);

    const legendSpacing = 30; // Adjust the spacing between legend items

    // Line chart legend item
    if (config.showLineChart) {
      const lineLegend = legend.append('g')
        .attr('class', 'line-legend')
        .attr('transform', `translate(0, 0)`);

      lineLegend.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 20)
        .attr('y2', 0)
        .attr('stroke', config.lineColor) // Use the selected line color from options
        .attr('stroke-width', 2);

      lineLegend.append('text')
        .attr('x', 25)
        .attr('y', 5)
        .text('Line Chart')
        .attr('font-size', 14)
        .attr('font-weight', 'bold');
    }

    // Bar chart legend item
    if (config.showBarChart) {
      const barLegend = legend.append('g')
        .attr('class', 'bar-legend')
        .attr('transform', `translate(0, ${legendSpacing})`);

      barLegend.append('rect')
        .attr('x', -70)
        .attr('y', -10)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', config.barColor) // Use the selected bar color from options

      barLegend.append('text')
        .attr('x', -45)
        .attr('y', 5)
        .text('Bar Chart')
        .attr('font-size', 14)
        .attr('font-weight', 'bold');
    }
  },
});

// Helper functions for tooltip content
function getDimensionLabel(row, dimensions) {
  return dimensions.map(dimension => row[dimension.name].value).join(' - ');
}

function getDimensionDetails(row, dimensions) {
  return dimensions.map(dimension => ({
    name: dimension.label_short,
    value: row[dimension.name].value,
  }));
}

function getMeasureDetails(row, measures) {
  return measures.map(measure => ({
    name: measure.label_short,
    value: row[measure.name].value,
  }));
}
