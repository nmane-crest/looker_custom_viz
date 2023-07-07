looker.plugins.visualizations.add({
  id: "label",
  label: "Label",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
    create: function (element, config) {
        // Create a container element to hold the label visualization
        var container = element.appendChild(document.createElement("div"));

        // Set up initial styling and configuration for the container
        container.className = "label-container";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.textAlign = "center";
    },
    // Render in response to the data or settings changing
    updateAsync: function (data, element, config, queryResponse, details, done) {

        // Clear any errors from previous updates
        this.clearErrors();

        // Throw some errors and exit if the shape of the data isn't what this chart needs
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
            return;
        }

        // Clear the container before updating
        container.innerHTML = "";

        // Loop through the data and create labels
        data.forEach(function (datum) {
            var label = container.appendChild(document.createElement("div"));
            label.textContent = datum.label;
            // Add additional styling and formatting to the label if needed
        });
        // We are done rendering! Let Looker know.
        done()
    }
});
