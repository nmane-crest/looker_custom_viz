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
    // Create a container for the chart
    element.innerHTML = '<div id="custom-combined-chart"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Remove any existing chart before creating a new one
    d3.select('#custom-combined-chart').selectAll('*').remove();

    const width = 600; // Adjust the desired width of the SVG
    const height = 400; // Adjust the desired height of the SVG

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
      { x : 4,   y: 0 },
      { x : 5,   y: 0 },
      { x : 6,  y: 40 },
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
      .range([0, width])
      .padding(0.1);

    const yLineScale = d3.scaleLinear()
      .domain([0, d3.max(lineData, d => d.y)])
      .range([height, 0]);

    const yBarScale = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.y)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(d.x) + xScale.bandwidth() / 2)
      .y(d => yLineScale(d.y));

    // Conditionally render the line chart based on the configuration option
    if (config.showLineChart) {
      const lineChart = svg.append('g').attr('class', 'line-chart');
      lineChart.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('d', line);
    }

    // Conditionally render the bar chart based on the configuration option
    if (config.showBarChart) {
      const barChart = svg.append('g').attr('class', 'bar-chart');
      barChart.selectAll('.bar')
        .data(barData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yBarScale(d.y))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yBarScale(d.y))
        .attr('fill', 'orange');
    }
  },
});
