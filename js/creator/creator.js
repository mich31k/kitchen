var shape = ShapeFactory.build(Shapes.BigWallCabinet, { posX: 80, posY: 80, strokeColor: "#000" });
var shape1 = ShapeFactory.build(Shapes.Door, { posX: 280, posY: 280, strokeColor: "#a00" });

var Creator = {

    _dragState: false,
    _activeShape: {},
    _options: {},
    _context: {},
    _data: {
        shapes: [],
        height: 500,
        width: 500
    },


    _dataSample: {
        shapes: [
            Shape
        ],

        height: 100,
        width: 100
    },

    init: function (options) {
        // Save options
        this._options = options;

        // Init canvas
        this.initCanvas(this._options.canvasId);

        // Init Toolbox
        this.initToolbox(this._options.toolboxId);

        // Register events
        this.registerEvents();

        shape.draw(this._context);
        this._data.shapes.push(shape);

        shape1.draw(this._context);
        this._data.shapes.push(shape1);
    },


    // Init Empty Canvas
    initCanvas: function (canvasId) {
        var canvas = $(canvasId);
        this._context = canvas.getContext("2d");
    },


    // Init Toolbox with shapes
    initToolbox: function (toolboxId) {
        var toolbox = $("toolbox");
        var canvases = [];

        var html = "";

        for (var key in Shapes) {
            var shape = ShapeFactory.build(Shapes[key], { posX: 22, posY: 0, strokeColor: "#000" });

            html += "<div class='col-sm-12'><canvas id='toolbox-" + Shapes[key] + "' width='" + (shape.width + 25 ) + "' height='" + shape.height + "'></canvas></div>";

            canvases.push({
                canvasId: "toolbox-" + Shapes[key],
                shape: shape
            });
        }

        // Append canvases
        toolbox.innerHTML = html;

        // Init canvases
        for (var key in canvases) {
            var canvasEl = $(canvases[key].canvasId);
            var context = canvasEl.getContext("2d");

            canvases[key].shape.draw(context);
        }
    },


    // Register events
    registerEvents: function () {
        var self = this;

        // Drag and drop existing objects
        this._context.canvas.onmousedown = function (e) { self._registerOnMouseDown(e) };
        this._context.canvas.onmousemove = function (e) { self._registerOnMouseMove(e) };
        this._context.canvas.onmouseup = function (e) { self._registerOnMouseUp(e) };
    },


    // On mouse down
    _registerOnMouseDown: function (event) {
        this._dragState = true;

        var eventData = this._fetchEventData(event);
        console.log(eventData);

        // Get element under mouse
        this._activeShape = this._getElementOnPosition(eventData.x, eventData.y);
    },


    // On mouse move
    _registerOnMouseMove: function (event) {
        if ( this._dragState == true && this._activeShape != null) {
            var eventData = this._fetchEventData(event);

            this._activeShape.posX = eventData.x;
            this._activeShape.posY = eventData.y;

            this._redrawAll();
        }
    },

    _redrawAll: function () {
        this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);

        for (var key in this._data.shapes) {
            let shape = this._data.shapes[key];
            shape.draw(this._context);
        }
    },

    // On mouse down
    _registerOnMouseUp: function (event) {
        this._dragState = false;

        if (this._activeShape != null) {
            if (this._activeShape.wall == true) {
                let offsetX = this._activeShape.posX;
                let offsetY = this._activeShape.posY;
                let offsetX2 = this._context.canvas.width - (this._activeShape.posX + this._activeShape.width);
                let offsetY2 = this._context.canvas.height - (this._activeShape.posY + this._activeShape.height);

                let min = Math.min(offsetX, offsetY, offsetX2, offsetY2);

                var redraw = true;
                if (min == offsetX) {
                    this._activeShape.posX = 0;
                } else if (min == offsetY) {
                    this._activeShape.posY = 0;
                } else if (min == offsetX2) {
                    this._activeShape.posX = this._context.canvas.width - this._activeShape.width;
                } else if (min == offsetY2) {
                    this._activeShape.posY = this._context.canvas.height - this._activeShape.height;
                } else {
                    redraw = false;
                }

                if (redraw) {
                    this._redrawAll();
                }
            }

            this._activeShape = null;
        }
    },


    // Get element on position
    _getElementOnPosition: function (posX, posY) {
        var self = this;

        for (var key in self._data.shapes) {
            let shape = self._data.shapes[key];

            if ((posX >= shape.posX && posY >= shape.posY) &&
                (posX <= shape.posX + shape.width && posY <= shape.posY + shape.height)) {

                return shape;
            }
        }
    },


    // Fetch event data
    _fetchEventData: function (event) {
        return {
            x: event.offsetX,
            y: event.offsetY
        };
    },

    // Load data
    loadData: function (data) {
        this._data = data;
    },


    // Get data
    getData: function () {
        var self = this;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.loadData(this.responseText);
            }
        };

        xhttp.open("GET", this._options.getUrl, true);
        xhttp.send();
    },


    // Save data
    saveData: function () {
        var self = this;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.showSuccess("Data successfully saved");
            }
        };

        xhttp.open("POST", this._options.saveUrl, true);
        xhttp.send("data=" + JSON.stringify(self.data) );
    },


    // Show feedback message
    showSuccess: function (message) {
        $("message").innerHTML = message;
        $("message").style.display = "block";
    },


    // Clear canvas
    clear: function() {
        this.context;
    },


    // Get canvas height
    getHeight: function() {
        return this.context.height;
    },


    // Get canvas width
    getWidth: function() {
        return this.canvas.width;
    }
}


// Load creator
window.onload = function () {
    Creator.init({
        canvasId: "floor",
        toolboxId: "toolbox",
        getUrl: "localhost/get.php",
        saveUrl: "localhost/save.php",

    });
}


// Create floor from inputs
function create_floor() {
    $("floor").height = $("length").value;
    $("floor").width = $("width").value;
}