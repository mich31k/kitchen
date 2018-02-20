// Init creator

var door = ShapeFactory.build("door", {
    posX: 10,
    posY: 20,
    height: 20,
    width: 20,
    rotation: 0,
    altitude: 0,
    maxDegree: 105
});

console.log(door);