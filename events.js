var startEvent,
    startCoordinates,
    newShape,
    shapes = {
      67: "circle",
      82: "rect",
    }
    keyLogger = {},
    currentShape = shapes[82],
    svg = document.getElementById('chart'),
    dataDropDiv = document.getElementById('data-drop-container');

document.onkeydown = toggleKey;
document.onkeyup = toggleKey;
svg.addEventListener("mousedown", dragStart);

document.addEventListener('DOMContentLoaded',function() {
    document.getElementById("selectedFile").onchange = dataDrop;
},false);

window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);

window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

window.addEventListener("dragend",function(e){
  e = e || event;
  e.preventDefault();
},false);

dataDropDiv.addEventListener("drop", dataDrop);

document.getElementById("data-drop-placeholder-text").addEventListener("click", function() {
  document.getElementById('selectedFile').click();
});

function toggleKey(e) {
  keyLogger[e.keyCode] = !keyLogger[e.keyCode];

  if(keyLogger[16] == true && keyLogger[17] == true && keyLogger[76] == true)
    viz.loop();

  else if (shapes[e.keyCode])
    currentShape = shapes[e.keyCode];
}


function dragStart(dragStartEvent) {
  var padding;

  if(dragStartEvent.target.nodeName !== "svg")
    return

  if(dragStartEvent.buttons != 1)
    return

  svg.addEventListener("mouseup", dragEnd);
  padding = parseFloat(window.getComputedStyle(dragStartEvent.target.parentNode, null).getPropertyValue('padding-left'));

  startEvent = dragStartEvent;
  startCoordinates = [dragStartEvent.offsetX + padding, dragStartEvent.offsetY + padding];

  if(currentShape == "rect") {
    newShape = new Rect();
  }

  else {
    newShape = new Circle();
  }

  newShape.cornerStart = [dragStartEvent.offsetX + padding, dragStartEvent.offsetY + padding];

  svg.addEventListener("mousemove", updateShape);
  newShape.createInitial(svg, true);
}

function dragEnd(dragEndEvent) {
  svg.removeEventListener("mousemove", updateShape);
  svg.removeEventListener("mouseup", dragEnd);

  if(!newShape.cornerEnd || Math.hypot((newShape.cornerEnd[0] - newShape.cornerStart[0]), (newShape.cornerEnd[1] - newShape.cornerStart[1])) <= 25)
  {
    newShape.g.remove();
    newShape = null;
    return;
  }

  viz.initialShapes.push(newShape);
  SHAPE_COUNTER++;
  newShape = null;
}

function updateShape(newLocation) {
  var padding = parseFloat(window.getComputedStyle(newLocation.target.parentNode, null).getPropertyValue('padding-left'));

  newShape.cornerEnd = [newLocation.pageX - startEvent.pageX + startCoordinates[0], newLocation.pageY - startEvent.pageY + startCoordinates[1]]

  newShape.update(svg);
}

function dataDrop(dataDropEvent) {
  var file,
      reader;

  if(dataDropEvent.dataTransfer)
    file = dataDropEvent.dataTransfer.files[0];

  else
  {
    file = dataDropEvent.target.files[0]
  }

  if (file) {
    reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
      vizData.data = d3.csvParse(evt.target.result);
      vizData.findDataTypes();
      vizData.show();
    }
  }
}