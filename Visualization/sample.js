looker.plugins.visualizations.add({
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
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
    for (var i of queryResponse.fields.dimensions){
      console.log("i:",data[i.name])
      // data.forEach(function(value) {
      var td = document.createElement('td');
      console.log("actul value:",data[i.name])
      td.textContent = data[i.name];
      row.appendChild(td);
      }
      console.log("row added...")
      chart.appendChild(row);
      console.log("successfully appended....")
    element.appendChild(chart);
    console.log("chart added.....")
    doneRendering()
    }
});
