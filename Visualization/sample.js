looker.plugins.visualizations.add({
  create: function (element, config) {
        // element.innerHTML = "<h1>Ready to render!</h1>";
        var chart = document.createElement('table');
        chart.id = 'custom-table-chart';
        element.appendChild(chart);
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
      console.log("update started.....")

      // console.log("data",data)
      // console.log("element",element)
      // console.log("config",config)
      // console.log("queryResponse",queryResponse)
      // console.log("details",details)


    var chart = element.firstChild;
    chart.remove();

    var headerRow = document.createElement('tr');
    for (var i of queryResponse.fields.dimensions){
      // console.log("Dimansion name:",i.name)
      var th = document.createElement('th');
      th.textContent = i.name;
      headerRow.appendChild(th);

    }
    chart.appendChild(headerRow);

    // Create table rows
      data.forEach(function(row) {
        console.log(row)
        var rows = document.createElement('tr');
        Object.keys(row).forEach(function(key){
          var td = document.createElement('td');
          td.textContent = row[key].value;
          rows.appendChild(td);
        });
        chart.appendChild(rows);
      });


    element.appendChild(chart);
    doneRendering()
    }
});
