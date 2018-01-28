function Rect() {
  Shape.call(this, "rect", {
    "center": [0, 0],
    "top-left": [0, 0],
    "top-middle": [0, 0],
    "top-right": [0, 0],
    "right-middle": [0, 0],
    "bottom-right": [0, 0],
    "bottom-middle": [0, 0],
    "bottom-left": [0, 0],
    "left-middle": [0, 0]
  });
  this.dimensions = {
    "width": "",
    "height": "",
    "x-loc": ""
  };
}

Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.update = function(svg) {
  this.dimensions["width"] = Math.abs(this.cornerStart[0] - this.cornerEnd[0]);
  this.dimensions["height"] = Math.abs(this.cornerStart[1] - this.cornerEnd[1]);

  d3.select(this.el)
    .attr("x", this.cornerStart[0])
    .attr("y", this.cornerStart[1])
    .attr("width", this.dimensions["width"])
    .attr("height", this.dimensions["height"]);

  this.anchorLocations.update({
    "center": [this.dimensions["width"] / 2, this.dimensions["height"] / 2],
    "top-left": [0, 0],
    "top-middle": [this.dimensions["width"] / 2, 0],
    "top-right": [this.dimensions["width"], 0],
    "right-middle": [this.dimensions["width"], this.dimensions["height"] / 2],
    "bottom-right": [this.dimensions["width"], this.dimensions["height"]],
    "bottom-middle": [this.dimensions["width"] / 2, this.dimensions["height"]],
    "bottom-left": [0, this.dimensions["height"]],
    "left-middle": [0, this.dimensions["height"] / 2]
  });
};

Rect.prototype.createNew = function(el, layer, i) {
  this.boundData = el.__data__;
  this.boundData["index"] = i;

  var x = d3.scaleLinear()
    .domain(vizData.dataTypes[this.mapping["x-loc"]["text"]]["domain"])
    .range([0, WIDTH]);

  var y = d3.scaleLinear()
    .domain(vizData.dataTypes[this.mapping["height"]["text"]]["domain"])
    .range([0, HEIGHT]);

  d3.select(el)
    .attr("x", (this.mapping["width"]["text"] ? +this.mapping["width"]["text"] : 50) * i)
    .attr("y", HEIGHT - y(+this.boundData[this.mapping["height"]["text"]]))
    .attr("width", (this.mapping["width"]["text"] ? +this.mapping["width"]["text"] : 50))
    .attr("height", y(+this.boundData[this.mapping["height"]["text"]]));
}