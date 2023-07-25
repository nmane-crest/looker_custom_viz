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

        // Extract dimensions and measures from queryResponse
        const dimensions = queryResponse.fields.dimension_like;
        const measures = queryResponse.fields.measure_like;

        // Extract data for the line chart
        const lineData = data.map(row => ({
            x: dimensions.length === 3 ? `${row[dimensions[0].name].value} - ${row[dimensions[1].name].value} - ${row[dimensions[2].name].value}` : dimensions.length === 2 ? `${row[dimensions[0].name].value} - ${row[dimensions[1].name].value}` : row[dimensions[0].name].value,
            y: row[measures[0].name].value,
        }));

        // Extract data for the bar chart (for multiple measures, we'll use the first measure)
        const barData = data.map(row => ({
            x: dimensions.length === 3 ? `${row[dimensions[0].name].value} - ${row[dimensions[1].name].value} - ${row[dimensions[2].name].value}` : dimensions.length === 2 ? `${row[dimensions[0].name].value} - ${row[dimensions[1].name].value}` : row[dimensions[0].name].value,
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

        // Add tooltip div for displaying values on hover
        const tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', '1px solid #ccc')
            .style('padding', '8px');

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
                .attr('fill', 'orange')
                .on('mouseover', function (event, d) {
                    tooltip.style('visibility', 'visible')
                        .html(`<strong>${dimensions.length === 3 ? 'Dimension 1 - Dimension 2 - Dimension 3' : dimensions.length === 2 ? 'Dimension 1 - Dimension 2' : 'Dimension 1'}: </strong>${d.x}<br><strong>${measures[0].name}: </strong>${d.y}`)
                        .style('left', (event.pageX) + 'px')
                        .style('top', (event.pageY - 30) + 'px');
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
                .call(d3.axisBottom(xScale).tickSizeOuter(0))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('transform', 'rotate(-45) translate(-10, -10)');

            lineChart.append('g')
                .call(d3.axisLeft(yLineScale));
        }
    },
});
