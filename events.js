var startEvent;
var startCoordinates;
var newShape;
var initialShapes = [];

var shapes = {
  67: "circle",
  82: "rect",
}

var currentShape = shapes[82];

document.onkeydown = checkKey;
var svg = document.getElementById('chart');
svg.addEventListener("mousedown", dragStart);

function checkKey(e) {
  if (shapes[e.keyCode])
    currentShape = shapes[e.keyCode];

  log("Current shape:" + currentShape);
}

function dragStart(dragStartEvent) {
  if(dragStartEvent.target.nodeName !== "svg")
    return

  if(dragStartEvent.buttons != 1)
    return

  svg.addEventListener("mouseup", dragEnd);
  var padding = parseFloat(window.getComputedStyle(dragStartEvent.target.parentNode, null).getPropertyValue('padding-left'));

  startEvent = dragStartEvent;
  startCoordinates = [dragStartEvent.offsetX + padding, dragStartEvent.offsetY + padding];

  if(currentShape == "rect") {
    newShape = new Rect();
  }

  else {
    newShape = new Circle();
  }

  initialShapes.push(newShape);

  newShape.cornerStart = [dragStartEvent.offsetX + padding, dragStartEvent.offsetY + padding];

  svg.addEventListener("mousemove", updateShape);
  newShape.initiate(svg);
  SHAPE_COUNTER++;
}

function dragEnd(dragEndEvent) {
  svg.removeEventListener("mousemove", updateShape);
  svg.removeEventListener("mouseup", dragEnd);
}

function updateShape(newLocation) {
  var padding = parseFloat(window.getComputedStyle(newLocation.target.parentNode, null).getPropertyValue('padding-left'));

  newShape.cornerEnd = [newLocation.pageX - startEvent.pageX + startCoordinates[0], newLocation.pageY - startEvent.pageY + startCoordinates[1]]

  newShape.update(svg);
}