looker.plugins.visualizations.add({
    id: 'custom_combined_chart',
    label: 'Custom Combined Chart',
    options: {
        showBarChart: {
            type: 'boolean',
            label: 'Show Bar Chart',
            default: true,
        },
        showLineChart: {
            type: 'boolean',
            label: 'Show Line Chart',
            default: true,
        },
    },
    create: function (element, config) {
        // Create a container for the chart with CSS style to fit the whole width of the div
        element.innerHTML = '<div id="custom-combined-chart" style="width: 100%; height: 400px; position: relative;"></div>';
    },
    update: function (data, element, config, queryResponse) {
        // Remove any existing chart before creating a new one
        d3.select('#custom-combined-chart').selectAll('*').remove();

        const containerWidth = element.clientWidth; // Use the width of the div as the container width
        const height = 400; // Adjust the desired height of the SVG
        const margin = { top: 40, right: 120, bottom: 100, left: 40 }; // Increased bottom and right margin for the legends and labels

        // Extract dimensions and measures from queryResponse
        const dimensions = queryResponse.fields.dimension_like;
        const measureLeft = queryResponse.fields.measure_like[0].name;
        const measureRight = queryResponse.fields.measure_like[1].name;

        // Extract data for the bar chart
        const barData = data.map(row => ({
            x: row[dimensions[0].name].value,
            y: row[measureLeft].value,
        }));

        // Extract data for the line chart
        const lineData = data.map(row => ({
            x: row[dimensions[0].name].value,
            y: row[measureRight].value,
        }));

        // Calculate the chart's width and height based on whether the bar chart is displayed
        const showBarChart = config.showBarChart;
        const showLineChart = config.showLineChart;
        const totalCharts = (showBarChart ? 1 : 0) + (showLineChart ? 1 : 0);
        const chartWidth = totalCharts > 0 ? (containerWidth - margin.left - margin.right) / totalCharts : 0;
        const chartHeight = height - margin.top - margin.bottom;

        // Calculate the required translation to center the chart within the SVG
        const translateX = (containerWidth - chartWidth * totalCharts) / 2 + margin.left;

        const svg = d3.select('#custom-combined-chart')
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', height);

        // Add a group for grid lines
        const gridGroup = svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${translateX},${margin.top})`);

        // Create scales and axes for the bar chart
        const xScaleBar = d3.scaleBand()
            .domain(barData.map(d => d.x))
            .range([0, chartWidth])
            .padding(0.1);

        const yScaleBar = d3.scaleLinear()
            .domain([0, d3.max(barData, d => d.y)])
            .range([chartHeight, 0]);

        // Create scales and axes for the line chart
        const xScaleLine = d3.scaleBand()
            .domain(lineData.map(d => d.x))
            .range([0, chartWidth])
            .padding(0.1);

        const yScaleLine = d3.scaleLinear()
            .domain([0, d3.max(lineData, d => d.y)])
            .range([chartHeight, 0]);

        // Conditionally render the bar chart based on the configuration option
        if (showBarChart) {
            const barChart = svg.append('g')
                .attr('class', 'bar-chart')
                .attr('transform', `translate(${translateX},${margin.top})`);

            barChart.selectAll('.bar')
                .data(barData)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('x', d => xScaleBar(d.x))
                .attr('y', d => yScaleBar(d.y))
                .attr('width', xScaleBar.bandwidth())
                .attr('height', d => chartHeight - yScaleBar(d.y))
                .attr('fill', 'Purple');

            // Add y-axis labels for the bar chart
            barChart.append('g')
                .attr('class', 'axis')
                .call(d3.axisLeft(yScaleBar).ticks(5).tickFormat(d3.format('.2s')).tickSize(0))
                .selectAll('text')
                .attr('font-family', 'Arial')
                .attr('font-size', '14px');

            // Add x-axis label for the bar chart
            barChart.append('text')
                .attr('x', chartWidth / 2)
                .attr('y', chartHeight + margin.bottom - 10)
                .attr('fill', '#000')
                .attr('font-family', 'Arial')
                .attr('font-size', '14px')
                .attr('text-anchor', 'middle')
                .text(dimensions[0].label);
        }

        // Conditionally render the line chart based on the configuration option
        if (showLineChart) {
            const lineChart = svg.append('g')
                .attr('class', 'line-chart')
                .attr('transform', `translate(${translateX},${margin.top})`);

            const line = d3.line()
                .x(d => xScaleLine(d.x) + xScaleLine.bandwidth() / 2)
                .y(d => yScaleLine(d.y));

            lineChart.append('path')
                .datum(lineData)
                .attr('fill', 'none')
                .attr('stroke', 'green')
                .attr('stroke-width', 3)
                .attr('d', line);

            // Add y-axis labels for the line chart (right y-axis)
            lineChart.append('g')
                .attr('class', 'axis')
                .attr('transform', `translate(${chartWidth}, 0)`)
                .call(d3.axisRight(yScaleLine).ticks(5).tickFormat(d3.format('.2s')).tickSize(0))
                .selectAll('text')
                .attr('font-family', 'Arial')
                .attr('font-size', '14px');

            // Add x-axis label for the line chart
            lineChart.append('text')
                .attr('x', chartWidth / 2)
                .attr('y', chartHeight + margin.bottom - 10)
                .attr('fill', '#000')
                .attr('font-family', 'Arial')
                .attr('font-size', '14px')
                .attr('text-anchor', 'middle')
                .text(dimensions[0].label);
        }

        // Add values on the x-axis
        const xAxis = d3.axisBottom(showBarChart ? xScaleBar : xScaleLine)
            .tickSize(0); // Remove ticks on the x-axis
        svg.append('g')
            .attr('transform', `translate(${translateX},${chartHeight + margin.top})`)
            .call(xAxis)
            .selectAll('text')
            .attr('font-family', 'Arial')
            .attr('font-size', '14px')
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '-0.15em')
            .attr('transform', 'rotate(-65)');

        // Remove the horizontal axis line and marks from both charts
        svg.selectAll('.axis .domain')
            .attr('stroke', 'none');

        // Add legends for the chart types and measures on the y-axis
        const legendGroup = svg.append('g')
            .attr('class', 'legend-group')
            .attr('transform', `translate(${containerWidth - margin.right},${margin.top})`);

        const legendBarRect = legendGroup.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', 'Purple');

        const legendLineRect = legendGroup.append('rect')
            .attr('x', 0)
            .attr('y', 30)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', 'green');

        const legendTextLeft = legendGroup.append('text')
            .attr('x', 30)
            .attr('y', 15)
            .attr('fill', '#000')
            .attr('font-family', 'Arial')
            .attr('font-size', '14px')
            .text(`${queryResponse.fields.measure_like[0].label} (Bar Chart)`);

        const legendTextRight = legendGroup.append('text')
            .attr('x', 30)
            .attr('y', 45)
            .attr('fill', '#000')
            .attr('font-family', 'Arial')
            .attr('font-size', '14px')
            .text(`${queryResponse.fields.measure_like[1].label} (Line Chart)`);
    },
});
