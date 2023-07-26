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
        this.container.style.fontSize = "16px"; // Add font size
        this.container.style.fontFamily = "Arial"; // Add font family

        // Add style to indicate clickable label and hover effect
        const style = document.createElement("style");
        style.innerHTML = `
            #info > div:first-child span {
                cursor: pointer;
            }
            #info > div:first-child span:hover {
                text-decoration: underline;
                color: blue;
            }
        `;
        this.container.appendChild(style);

        // SVG code remains the same
        const svgCode = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="400" height="150" viewBox="0,0,256,256" style="fill:#000000;width: 100px;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#4caf50"></path><path d="M34.602,14.602l-13.602,13.597l-5.602,-5.598l-2.797,2.797l8.399,8.403l16.398,-16.402z" fill="#ffffff"></path></g></g></svg>';
        this.container.innerHTML = svgCode;
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        const measuresData = queryResponse.fields.measures.map(mes => mes.name);
        const list_measures = [];
        const data_dim_mes = [];

        data.forEach(row => {
            list_measures.push(row[measuresData[0]].value);
        });

        document.querySelectorAll('#info').forEach((ele) => { ele.remove(); });

        const fieldDataElement = document.createElement("div");
        fieldDataElement.setAttribute('id', 'info');
        fieldDataElement.style.display = "flex";
        fieldDataElement.style.flexDirection = "row"; // Display elements below each other
        fieldDataElement.style.alignItems = "center"; // Center elements horizontally

        data_dim_mes.push("New");
        data_dim_mes.push(list_measures[0]);
        data_dim_mes.push("Open");
        data_dim_mes.push(0);
        data_dim_mes.push("Close");
        data_dim_mes.push(0);

        data_dim_mes.forEach((value, index) => {
            const fieldElement = document.createElement("div");
            fieldElement.style.padding = "6px";

            if ((index + 1) % 2 == 1) {
                const label = document.createElement("span");
                label.style.cursor = "pointer"; // Add pointer cursor to clickable label
                label.textContent = value + ":";
                label.addEventListener("mouseenter", () => {
                    label.style.color = "blue"; // Change color to blue on hover
                });
                label.addEventListener("mouseleave", () => {
                    label.style.color = "initial"; // Reset color on mouse leave
                });
                fieldElement.appendChild(label);
            } else {
                fieldElement.style.color = "blue";
                fieldElement.textContent = value;
                label.style.cursor = "pointer"; // Add pointer cursor to clickable label
                label.addEventListener("click", () => {
                    label.addEventListener("click", () => {
                        window.open("https://crestdatasys.backstory.chronicle.security/alerts", "_blank");
                    });
                });
                label.addEventListener("mouseenter", () => {
                    label.style.color = "green"; // Change color to green on hover
                });
                label.addEventListener("mouseleave", () => {
                    label.style.color = "initial"; // Reset color on mouse leave
                });
            }
            fieldDataElement.appendChild(fieldElement);
        });

        this.container.appendChild(fieldDataElement);
        done();
    }
});
