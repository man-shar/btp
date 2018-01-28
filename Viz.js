function Viz() {
  this.initialShapes = [];
}

Viz.prototype.loop = function() {
  log("looped");

  this.initialShapes.forEach(function(shape) {
    var layer = new Layer();
    layer.type = shape.type;
    layer.initialShape = shape;
    layer.layerNumber = shape.shapeNumber;
    layer.createLayer();
  });
}