looker.plugins.visualizations.add({
  create: function (element, config) {
        // element.innerHTML = "<h1>Ready to render!</h1>";
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {


    // for(var i of data){
    //   console.log(i)
    // }
    var chart = document.createElement('table');
    chart.id = 'custom-table-chart';
    console.log("update started.....")
    // Create table header
    var headerRow = document.createElement('tr');
    for (var i of queryResponse.fields.dimensions){
      // console.log("Dimansion name:",i.name)
      var th = document.createElement('th');
      th.textContent = i.name;
      headerRow.appendChild(th);
    }
    chart.appendChild(headerRow);
    console.log("headerRow completed...")

    // Create table rows
    var row = document.createElement('tr');
      data.forEach(function(row) {
        console.log(row)
        Object.keys(row).forEach(function(key){
          var td = document.createElement('td');
          console.log("actul value:",row[key])
          td.textContent = row[key];
          row.appendChild(td);
        });
      });
    console.log("row added...")
    chart.appendChild(row);
    console.log("successfully appended....")
    element.appendChild(chart);
    console.log("chart added.....")
    doneRendering()
    }
});
