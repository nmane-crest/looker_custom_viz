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
  },
  create: function (element, config) {
    // Create a container for the chart with CSS style to fit the whole width of the div
    element.innerHTML = '<div id="custom-combined-chart" style="width: 100%; height: 400px; position: relative; font-family: inherit; font-size: 12px;"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Remove any existing chart before creating a new one
    d3.select('#custom-combined-chart').selectAll('*').remove();

    const width = element.clientWidth; // Use the width of the div as the SVG width
    const height = 400; // Adjust the desired height of the SVG
    const margin = { top: 40, right: 20, bottom: 40, left: 40 };

    // Extract dimensions and measures from queryResponse
    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Extract data for the line chart
    const lineData = data.map(row => ({
      x: row[dimensions[0].name].value,
      y: row[measures[0].name].value,
    }));

    // Extract data for the bar chart (for multiple measures, we'll use the first measure)
    const barData = data.map(row => ({
      x: row[dimensions[0].name].value,
      y: row[measures[0].name].value,
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
        .attr('fill', 'orange');

      // Add x-axis for the bar chart (without the horizontal axis line and marks)
      const barXAxis = barChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

      // Add y-axis labels for the bar chart
      barChart.append('g')
        .call(d3.axisLeft(yBarScale).ticks(5).tickFormat(d3.format('.2s')))
        .append('text')
        .attr('x', 2)
        .attr('y', yBarScale(yBarScale.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text(measures[0].label);

      // Add x-axis label for the bar chart
      barChart.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('fill', '#000')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .text(dimensions[0].label);

      // Remove the horizontal axis line and marks from the bar chart
      barXAxis.select('.domain').remove();
      barXAxis.selectAll('.tick line').remove();

      // Add horizontal grid lines for the bar chart
      barChart.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yBarScale).tickSize(-chartWidth).tickFormat('').tickSizeOuter(0).tickSizeInner(-chartWidth).tickPadding(10).tickValues(yBarScale.ticks(5)).tickFormat(''))
        .selectAll('.tick')
        .selectAll('line')
        .attr('stroke', '#ddd');
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
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add x-axis for the line chart (without the horizontal axis line and marks)
      const lineXAxis = lineChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

      // Add y-axis labels for the line chart
      lineChart.append('g')
        .call(d3.axisLeft(yLineScale).ticks(5).tickFormat(d3.format('.2s')))
        .append('text')
        .attr('x', 2)
        .attr('y', yLineScale(yLineScale.ticks().pop()) + 0.5)
        .attr('dy', '0.32em')
        .attr('fill', '#000')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .text(measures[0].label);

      // Add x-axis label for the line chart
      lineChart.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('fill', '#000')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .text(dimensions[0].label);

      // Remove the horizontal axis line and marks from the line chart
      lineXAxis.select('.domain').remove();
      lineXAxis.selectAll('.tick line').remove();

      // Add horizontal grid lines for the line chart
      lineChart.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yLineScale).tickSize(-chartWidth).tickFormat('').tickSizeOuter(0).tickSizeInner(-chartWidth).tickPadding(10).tickValues(yLineScale.ticks(5)).tickFormat(''))
        .selectAll('.tick')
        .selectAll('line')
        .attr('stroke', '#ddd');
    }
  },
});
