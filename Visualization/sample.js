looker.plugins.visualizations.add({
    create: function (element, config) {
      console.log(" create started......")
        // var chart = document.createElement('table');
        // chart.id = 'custom-table-chart';
        // element.appendChild(chart);
        console.log("create End ...")
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    var chart = document.createElement('table');
    chart.id = 'custom-table-chart';
    console.log("update started.....")
    // Create table header
    var headerRow = document.createElement('tr');
    for (var i of queryResponse.fields.dimensions){
      console.log("Dimansion name:",i.name)
      var th = document.createElement('th');
      th.textContent = i.name;
      headerRow.appendChild(th);
    }
    chart.appendChild(headerRow);
    console.log("headerRow completed...")
    // Create table rows
    var row = document.createElement('tr');
    data.forEach(function(value) {
      console.log("Value:",value)
      for (var i of queryResponse.fields.dimensions){
        var td = document.createElement('td');
        console.log("actul value:",value[i.name].value)
        td.textContent = value[i.name].value;
        row.appendChild(td);
      }
      console.log("row added...")
      chart.appendChild(row);
      console.log("successfully appended....")
    });
    element.appendChild(chart);
    console.log("chart added.....")
    doneRendering()
    }
});
