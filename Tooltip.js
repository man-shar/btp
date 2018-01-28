function Tooltip() {
  this.visible = 0;
}

Tooltip.prototype.toggle = function(clickEvent) {
  var shape = this;
  var tooltip = document.getElementById('tooltip');

  if(tooltip.shape) {
    if((tooltip.shape.shapeNumber == shape.shape.shapeNumber) && shape.shape.tooltip.visible == 1) {
      tooltip.style.display = "none";
      shape.shape.tooltip.visible = 0;
      return;
    }

    if((tooltip.shape.shapeNumber == shape.shape.shapeNumber) && shape.shape.tooltip.visible == 0) {
      tooltip.style.display = "inline-block";
      shape.shape.tooltip.visible = 1;
      return;
    }
  }

  tooltip.shape = shape.shape;
  tooltip.innerHTML = "";
  for (var dimension in shape.shape.dimensions) {
    var div = tooltip
      .appendChild(document.createElement("div"));

    div.dimension = dimension;
    div.className = "tooltip-label"

    var label = div
      .appendChild(document.createElement("p"))

    label.textContent = toSentenceCase(truncateText(dimension) + " : ");

    var input = div.appendChild(document.createElement("div"));

    input.className = "column-drop-div";
    input.contentEditable = "true";
    input.innerHTML = shape.shape.mapping[dimension]["html"];

    input.addEventListener("input", function(e) {
      shape.shape.mapDimensions(e);
    })

    input.addEventListener("drop", function(e) {
      shape.shape.mapDimensions(e);
    });
  }

  tooltip.style.display = "inline-block"
  shape.shape.tooltip.visible = 1;
  var pos = shape.getBBox();

  tooltip.style.left = (pos.x + pos.width + 20) + "px";
  tooltip.style.top = (pos.y) + "px";
};