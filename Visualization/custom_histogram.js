looker.plugins.visualizations.add({
    id: 'custom_histogram',
    label: 'Custom Histogram',
    options: {},
    create: function (element, config) {
        // Create a new DOM element to render the histogram
        // console.log("create started.....")
        var chart = document.createElement('div');
        chart.id = 'custom-histogram-chart';
        element.appendChild(chart);
        // console.log("chart addded ....")

        // Render the histogram using a library like D3.js
        // renderHistogram(chart);
    },
    updateAsync: function (data, element, config, queryResponse, details, done) {
        // Update the histogram based on the new data
        // console.log("updating graph started....")
        updateHistogram(element.querySelector('#custom-histogram-chart'), data);
        // console.log("Updated End....")
        done();
    }
});

// Function to render the histogram
function renderHistogram(element) {
    // Code to render the histogram using D3.js or any other library
    // Customize the appearance, scales, axes, and data binding as needed
    // Example code:
    // console.log("started rending Histogram")
    var data = [10, 20, 30, 40, 50];
    var svg = d3.select(element)
        .append('svg')
        .attr('width', 400)
        .attr('height', 200);
    // console.log("SVG created...")
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 400]);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
            return i * 40;
        })
        .attr('width', function (d) {
            return xScale(d);
        })
        .attr('height', 30);
        // console.log("rendering Completed...")
}

// Function to update the histogram with new data
function updateHistogram(element, data) {
    // Code to update the histogram based on new data
    // Example code:
    console.log(element)
    data = [10, 20, 30, 40, 50];
    console.log("data",data)
    console.log("update Histogram started..")
    // const d3 = window.d3;
    var svg = d3.select(element);
    var bars = svg.selectAll('rect')
        .data(data)
    bars.attr('width', function (d) {
        return xScale(d);
    });
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 400]);
    console.log(xScale)
    console.log("strated to bars enters...")
    bars.enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
            return i * 40;
        })
        .attr('width', function (d) {
            return xScale(d);
        })
        .attr('height', 30);
    console.log("Bar exited ...")
    bars.exit().remove();
}
