looker.plugins.visualizations.add({
    create: function (element, config) {
        // element.innerHTML = "<h1>Ready to render!</h1>";
        var chart = document.createElement('div');
        chart.id = 'custom-histogram-chart';
        element.appendChild(chart);
        // const para = document.createElement("p");
        // para.innerText = "This is a paragraph";
        // document.body.appendChild(para);
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        var html = "";
        // for (var row of data) {
        //     var cell = var cell = row[queryResponse.fields.dimensions[0].name];
        //     html += LookerCharts.Utils.htmlForCell(cell);
        // }

        for (var i of queryResponse.fields.dimensions){
          html +=i.name
        }
       element.innerHTML = html;
        doneRendering()
    }
});
