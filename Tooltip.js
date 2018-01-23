function Tooltip() {
  this.visible = 0;
}

Tooltip.prototype.toggle = function(clickEvent) {
  var tooltip = document.getElementById('tooltip');

  if(tooltip.shape) {
    if((tooltip.shape.shapeNumber == this.shape.shapeNumber) && this.shape.tooltip.visible == 1) {
      tooltip.style.display = "none";
      this.shape.tooltip.visible = 0;
      return;
    }

    if((tooltip.shape.shapeNumber == this.shape.shapeNumber) && this.shape.tooltip.visible == 0) {
      tooltip.style.display = "inline-block";
      this.shape.tooltip.visible = 1;
      return;
    }
  }

  function truncateText(text) {
    var truncated = text;

    if (truncated.length > 6) {
        truncated = truncated.substr(0,6) + '...';
    }
    return truncated;
  }

  tooltip.shape = this.shape;
  tooltip.innerHTML = "";
  for (var dimension in this.shape.dimensions) {
    var div = tooltip
      .appendChild(document.createElement("div"));

    div.dimension = dimension;

    var label = div
      .appendChild(document.createElement("p"))

    div.className = "tooltip-label"

    label.textContent = truncateText(dimension) + " : ";

    var input = div.appendChild(document.createElement("input"));

    input.type = "text";
    input.style.width = "50px";
  }

  tooltip.style.display = "inline-block"
  this.shape.tooltip.visible = 1;
  var pos = this.getBBox();

  tooltip.style.left = (pos.x + pos.width + 20) + "px";
  tooltip.style.top = (pos.y) + "px";
};