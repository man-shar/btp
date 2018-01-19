var rectObject = new Rect();
var circleObject = new Circle();

var shapes = {
  67: circleObject,
  82: rectObject,
}

var currentShape = shapes[82];

document.onkeydown = checkKey;
var svg = document.getElementById('chart');
svg.addEventListener("mousedown", dragStart);

function checkKey(e) {
  if (shapes[e.keyCode])
    currentShape = shapes[e.keyCode];

  log("Current shape:" + currentShape.name);
}

function dragStart(dragStartEvent) {
  if(dragStartEvent.buttons != 1)
    return

  svg.addEventListener("mouseup", dragEnd);

  currentShape.cornerStart = [dragStartEvent.x, dragStartEvent.y]
  svg.addEventListener("mousemove", updateShape);
  currentShape.initiate(svg);
}

function dragEnd(dragEndEvent) {
  svg.removeEventListener("mousemove", updateShape);
  svg.removeEventListener("mouseup", dragEnd);
}

function updateShape(newLocation) {
  currentShape.cornerEnd = [newLocation.x, newLocation.y]
  currentShape.update(svg);
}