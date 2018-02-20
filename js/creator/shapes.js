'use strict'

// Factory will create new shape of given type
var ShapeFactory = {
    build: function(type, options) {

        // Switch
        if (type == "door") {
            return new Door(options);


        } else if (type == "wall-cabinet") {
            return new WallCabinet(options);


        } else if (type == "floor-cabinet") {
            return new FloorCabinet(options);


        } else if (type == "some-cabinet") {
            return new SomeCabinet(options);


        } else {
            throw "Shape type not specified";
        }

    }
}



// --- Base
var Shape = function (options) {
    this.posX       = options.posX;
    this.posY       = options.posY;
    this.width      = options.width;
    this.height     = options.height;
    this.altitude   = options.altitude;
    this.rotation   = options.rotation;
}



// --- Door
var Door = function (options) {
    Shape.call(this, options);

    // Added properties
    this.maxDegree = options.maxDegree;
}

Door.prototype = Object.create(Shape.prototype);

// Added methods
Door.prototype.open = function () {
    console.log("hello");
}




// --- Wall Cabinet
var WallCabinet = function (options) {
    Shape.call(this, options);
}

WallCabinet.prototype = Object.create(Shape.prototype);


// Feel free to edit any variables, the ones I made up are self-explanatory :D