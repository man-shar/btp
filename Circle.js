function Circle() {
  Shape.call(this, "circle", {
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
    "radius": "",
    "x-loc": "",
    "y-loc": ""
  };
}

Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

Circle.prototype.update = function(svg) {
  this.dimensions["radius"] = Math.max(Math.abs(this.cornerStart[0] - this.cornerEnd[0]), Math.abs(this.cornerStart[1] - this.cornerEnd[1]));

  d3.select(this.el)
    .attr("cx", this.cornerStart[0])
    .attr("cy", this.cornerStart[1])
    .attr("r", this.dimensions["radius"]);

  this.anchorLocations.update({
    "center": [this.dimensions["radius"], this.dimensions["radius"]],
    "top-left": [0, 0],
    "top-middle": [this.dimensions["radius"], 0],
    "top-right": [this.dimensions["radius"] * 2, 0],
    "right-middle": [this.dimensions["radius"] * 2, this.dimensions["radius"]],
    "bottom-right": [this.dimensions["radius"] * 2, this.dimensions["radius"] * 2],
    "bottom-middle": [this.dimensions["radius"], this.dimensions["radius"] * 2],
    "bottom-left": [0, this.dimensions["radius"] * 2],
    "left-middle": [0, this.dimensions["radius"]]
  });

  d3.select(this.anchorContainer)
    .attr("transform", "translate(" + (this.cornerStart[0] - this.dimensions["radius"]) + ", " + (this.cornerStart[1] - this.dimensions["radius"]) + ")").node();
};

Circle.prototype.createNew = function(el, layer, i) {
  this.boundData = el.__data__;
  this.boundData["index"] = i;

  var x = d3.scaleLinear()
    .domain(vizData.dataTypes[this.mapping["x-loc"]["text"]]["domain"])
    .range([0, WIDTH]);

  var y = d3.scaleLinear()
    .domain(vizData.dataTypes[this.mapping["y-loc"]["text"]]["domain"])
    .range([0, HEIGHT]);

  function r() {
    var r;
    if(isNaN(this.mapping["y-loc"]["text"]))
    {
      var r = d3.scaleLinear()
      .domain(vizData.dataTypes[this.mapping["y-loc"]["text"]]["domain"])
      .range([0, HEIGHT]);
    }
    else
      r = 15;
    return r;
  }

  d3.select(el)
    .attr("x", (this.mapping["width"]["text"] ? +this.mapping["width"]["text"] : 50) * i)
    .attr("y", HEIGHT - y(+this.boundData[this.mapping["height"]["text"]]))
    .attr("width", (this.mapping["width"]["text"] ? +this.mapping["width"]["text"] : 50))
    .attr("height", y(+this.boundData[this.mapping["height"]["text"]]));
}
