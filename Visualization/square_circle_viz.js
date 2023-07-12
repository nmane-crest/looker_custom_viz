looker.plugins.visualizations.add({
    options: {
        squareSize: {
            label: "Square Size",
            default: 200,
            type: "number"
        },
        borderWidth: {
            label: "Border Width",
            default: 5,
            type: "number"
        },
        borderColor: {
            label: "Border Color",
            default: "#FFFFFF",
            type: "string"
        }
    },

    create: function (element, config) {
        this.container = element.appendChild(document.createElement("div"));
        this.canvas = this.container.appendChild(document.createElement("canvas"));
        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "center";
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        var context = this.canvas.getContext("2d");
        var size = config.squareSize;
        this.canvas.width = size;
        this.canvas.height = size;

        context.clearRect(0, 0, size, size);

        // Draw square
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, size, size);
        context.lineWidth = config.borderWidth;
        context.strokeStyle = config.borderColor;
        context.strokeRect(0, 0, size, size);

        // Draw circle
        var radius = size / 3;
        var circleX = size / 2;
        var circleY = size / 2;

        // Function to draw the circle with a specified color
        function drawCircle(color) {
            context.beginPath();
            context.arc(circleX, circleY, radius, 0, 2 * Math.PI);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = config.borderWidth;
            context.strokeStyle = config.borderColor;
            context.stroke();
        }

        // Draw initial circle
        drawCircle("#77FF63");

        // Draw labels
        var dimentions = {}
        var labels = []
        var field_name = ""
        for (var i of queryResponse.fields.dimensions) {
            labels.push(i.name)
            field_name = i.label
        }
        // for (var i of queryResponse.fields.measures) {
        //     labels.push(i.name)
        // }
        for (var i of queryResponse.fields.dimensions) {
            dimentions[i.label] = []
            for (var j of queryResponse.data) {
                labels.forEach(function (row) {
                    dimentions[i.label].push(j[row].value)
                })
            }
            labels.push(i.label)
        }
        context.fillStyle = "black";
        context.font = "14px Arial";
        var lx = 50;
        dimentions[field_name].forEach(function (label, index) {
            var labelX = lx
            var labelY = (size - 20)
            lx = lx + 100;
            context.fillText(label, labelX, labelY);
        }, this);
        // Store a reference to the canvas element
        var canvasElement = this.canvas;
        this.canvas.addEventListener('click', function (event) {
            var rect = canvasElement.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            var color = ["#FFB3AB","#ACEBFF","#B0FFAE"]
            dimentions[field_name].forEach(function (label, index) {
                var labelX = 50 + (index * 100);
                var labelY = size - 20;

                if (x >= labelX && x <= labelX + context.measureText(label).width && y >= labelY - 20 && y <= labelY) {
                    clickedLabel = label; // Store the clicked label
                    drawCircle(color[index]);
                }
            });
        });
        done();
    }
});
