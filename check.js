// looker.plugins.visualizations.add({
//     options: {
//         // Your visualization options here
//     },

//     create: function (element, config) {
//         // Create the visualization container
//         this.container = element.appendChild(document.createElement("div"));
//         this.container.style.display = "flex";
//         this.container.style.justifyContent = "center";
//         this.container.style.alignItems = "center";

//         // Add the SVG code for the custom visualization
//         const svgCode = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="480" height="480" viewBox="0,0,256,256" style="fill:#000000;width: 150px;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#4caf50"></path><path d="M34.602,14.602l-13.602,13.597l-5.602,-5.598l-2.797,2.797l8.399,8.403l16.398,-16.402z" fill="#ffffff"></path></g></g></svg>';

//         // Set the innerHTML of the container to the SVG code
//         this.container.innerHTML = svgCode;

//     },

//     updateAsync: function (data, element, config, queryResponse, details, done) {
//         // Update the visualization if needed based on data or options

//         // Call the done() function to signal the end of the update
//         done();
//     }
// });
looker.plugins.visualizations.add({
    options: {
        // Your visualization options here
    },

    create: function (element, config) {
        // Create the visualization container
        this.container = element.appendChild(document.createElement("div"));
        this.container.style.display = "flex";
        this.container.style.flexWrap = "wrap";
        this.container.style.alignItems = "center";
        this.container.style.justifyContent = "center";
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        // Update the visualization if needed based on data or options

        // Clear the container before updating
        this.container.innerHTML = '';

        // SVG code for the check mark
        const svgCheckMark = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#4caf50"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

        // Extract dimension labels from the queryResponse
        const labels = queryResponse.fields.dimensions.map(dim => dim.label);

        // Loop through each label and create a div for each check mark with the label below it
        labels.forEach(label => {
            const divElement = document.createElement("div");
            divElement.style.display = "flex";
            divElement.style.flexDirection = "column";
            divElement.style.alignItems = "center";
            divElement.style.margin = "10px";

            // Create the SVG element and set the innerHTML to the check mark SVG code
            const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgElement.setAttribute("width", "24");
            svgElement.setAttribute("height", "24");
            svgElement.setAttribute("viewBox", "0 0 24 24");
            svgElement.innerHTML = svgCheckMark;

            // Create the label element and set the text content to the label
            const labelElement = document.createElement("div");
            labelElement.textContent = label;

            // Append the SVG element and the label element to the div element
            divElement.appendChild(svgElement);
            divElement.appendChild(labelElement);

            // Append the div element to the visualization container
            this.container.appendChild(divElement);
        });

        // Call the done() function to signal the end of the update
        done();
    }
});
