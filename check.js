looker.plugins.visualizations.add({
    options: {
        // Your visualization options here
    },

    create: function (element, config) {
        // Create the visualization container
        this.container = element.appendChild(document.createElement("div"));
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column"; // Display elements below each other
        this.container.style.alignItems = "center"; // Center elements horizontally
        this.container.style.marginTop = "10px";
        const svgCode = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="400" height="150" viewBox="0,0,256,256" style="fill:#000000;width: 100px;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#4caf50"></path><path d="M34.602,14.602l-13.602,13.597l-5.602,-5.598l-2.797,2.797l8.399,8.403l16.398,-16.402z" fill="#ffffff"></path></g></g></svg>';
        this.container.innerHTML = svgCode;
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        var fieldData = queryResponse.fields.dimensions.map(dim => dim.name);
        var measuresData = queryResponse.fields.measures.map(mes => mes.name);

        var fields = []
        fields.push(fieldData[0])
        fields.push(measuresData[0])
        // Create a set to keep track of unique field values
        const data_dim_mes=[]

        // Loop through each row of data and add field values to the set
        data.forEach(row => {
            fields.forEach(field =>{
                data_dim_mes.push(row[field].value)
            });
        });
        document.querySelectorAll('#info').forEach((ele)=>{ele.remove();})

        // Create a div element to hold the unique field data
        const fieldDataElement = document.createElement("div");
        fieldDataElement.setAttribute('id','info');
        fieldDataElement.style.display = "flex";
        fieldDataElement.style.flexDirection = "row"; // Display elements below each other
        fieldDataElement.style.alignItems = "center"; // Center elements horizontally

        // Loop through each unique field value and create a div for each
        data_dim_mes.forEach((value,index) => {
            if((index+1) % 2 == 1){
                const fieldElement = document.createElement("div");
                fieldElement.style.padding= "6px"
                var x= value + ":"
                fieldElement.textContent = x ;
                fieldDataElement.appendChild(fieldElement);
            }
            else{
                const fieldElement = document.createElement("div");
                fieldElement.style.padding= "6px"
                fieldElement.style.color= "blue"
                fieldElement.textContent = value;
                fieldDataElement.appendChild(fieldElement);
            }
        });

        // Append the unique field data div to the visualization container
        this.container.appendChild(fieldDataElement);
        done();
    }
});
