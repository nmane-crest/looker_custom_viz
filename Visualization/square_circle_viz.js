looker.plugins.visualizations.add({
    options: {
        squareSize: {
            label: "Square Size",
            default: 200,
            type: "number"
        }
    },

    create: function (element, config) {
        this.container = element.appendChild(document.createElement("div"));
        this.canvas = this.container.appendChild(document.createElement("canvas"));
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        var context = this.canvas.getContext("2d");
        var size = config.squareSize;

        this.canvas.width = size;
        this.canvas.height = size;

        context.clearRect(0, 0, size, size);

        // Draw square
        context.fillStyle = "red";
        context.fillRect(0, 0, size, size);

        // Draw circle
        var radius = size / 2;
        var circleX = size / 2;
        var circleY = size / 2;

        context.beginPath();
        context.arc(circleX, circleY, radius, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

        // Draw labels
        var labels = ["Label 1", "Label 2", "Label 3"];
        context.fillStyle = "black";
        context.font = "12px Arial";

        labels.forEach(function (label, index) {
            var labelX = (size / 2) - (context.measureText(label).width / 2);
            var labelY = (size / 2) + (index * 15);

            context.fillText(label, labelX, labelY);
        });

        done();
    }
});
