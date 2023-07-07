looker.plugins.visualizations.add({
    create: function (element, config) {
        // element.innerHTML = "<h1>Ready to render!</h1>";
        var chart = document.createElement('table');
        chart.id = 'custom-table-chart';
        element.appendChild(chart);
        // const para = document.createElement("p");
        // para.innerText = "This is a paragraph";
        // document.body.appendChild(para);
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        var html = "";
        for (var row of data) {
          for (var i of queryResponse.fields.dimensions){
            var cell = row[i];
            // html += "<table><tr><td>row[i]</td></table>";
            html += LookerCharts.Utils.htmlForCell(cell);
        }
    }
        // for (var i of queryResponse.fields.dimensions){
        //   html +=i.name
        // }
      // html += "<table><tr><td>123</td><td>456</td></tr></table>";

       element.innerHTML = html;
        doneRendering()
    }
});
