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
    // Create a container for the chart with CSS style to center the content
    element.innerHTML = '<div id="custom-combined-chart" style="display: flex; justify-content: center; align-items: center;"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Remove any existing chart before creating a new one
    d3.select('#custom-combined-chart').selectAll('*').remove();

    const width = 600; // Adjust the desired width of the SVG
    const height = 400; // Adjust the desired height of the SVG
    const margin = { top: 40, right: 20, bottom: 40, left: 40 };

    // Calculate the chart's width and height based on whether the bar chart is displayed
    const chartWidth = config.showBarChart ? width - margin.left - margin.right : width;
    const chartHeight = height - margin.top - margin.bottom;

    // Calculate the required translation to center the chart within the SVG
    const translateX = (width - chartWidth) / 2 + margin.left;

    const svg = d3.select('#custom-combined-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Sample data for line chart (replace with your actual data)
    const lineData = [
      { x: 0, y: 0 },
      { x: 1, y: 25 },
      { x: 2, y: 0 },
      { x: 3, y: 50 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 40 },
    ];

    // Sample data for bar chart (replace with your actual data)
    const barData = [
      { x: 0, y: 15 },
      { x: 1, y: 25 },
      { x: 2, y: 35 },
      { x: 3, y: 20 },
      { x: 4, y: 0 },
      { x: 5, y: 10 },
      { x: 6, y: 5 },
    ];

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

      // Add axes for the bar chart
      barChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

      barChart.append('g')
        .call(d3.axisLeft(yBarScale));
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

      // Add axes for the line chart
      lineChart.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

      lineChart.append('g')
        .call(d3.axisLeft(yLineScale));
    }
  },
});
