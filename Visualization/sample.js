looker.plugins.visualizations.add({
    create: function (element, config) {
        element.innerHTML = "<h1>Ready to render!</h1>";
        // var chart = document.createElement('table');
        // chart.id = 'custom-table-chart';
        // element.appendChild(chart);
        // const para = document.createElement("p");
        // para.innerText = "This is a paragraph";
        // document.body.appendChild(para);
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    //     var data = []
    //     for (var d of data) {
    //       // var row={}
    //       for (var i of queryResponse.fields.dimensions){
    //         // var cell = d[i.name];
    //         // row[i.name] = d[i.name]
    //         data.push(d[i.name])
    //         // html += LookerCharts.Utils.htmlForCell(cell);
    //     }
    //     // data.push(cell)
    // }
    // Create table header
    var html=""
    // var headerRow = document.createElement('tr');
    for (var i of queryResponse.fields.dimensions){
      // var th = document.createElement('th');
      // th.textContent = key;
      // headerRow.appendChild(th);
      html+=i
    }
    // chart.appendChild(headerRow);
    // // Create table rows
    // data.forEach(function(item) {
    //   var row = document.createElement('tr');
    //   Object.values(item).forEach(function(value) {
    //     var td = document.createElement('td');
    //     td.textContent = value;
    //     row.appendChild(td);
    //   });
    //   chart.appendChild(row);
    // });

    element.appendChild(chart);
    element.innerHTML = html
    doneRendering()
    }
});

// function table_creation(){
//     // Create table header
//     var headerRow = document.createElement('tr');
//     Object.keys(data[0]).forEach(function(key) {
//       var th = document.createElement('th');
//       th.textContent = key;
//       headerRow.appendChild(th);
//     });
//     chart.appendChild(headerRow);

//     // Create table rows
//     data.forEach(function(item) {
//       var row = document.createElement('tr');
//       Object.values(item).forEach(function(value) {
//         var td = document.createElement('td');
//         td.textContent = value;
//         row.appendChild(td);
//       });
//       chart.appendChild(row);
//     });

//     element.appendChild(chart);
// }
