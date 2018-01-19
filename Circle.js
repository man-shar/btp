function Circle() {
  this.name = "circle";
  this.parent;
  this.el;
  this.g;
  this.cornerStart;
  this.cornerEnd;
  this.diameter;
  this.numberAnchors = 9;
  this.anchorContainer;
  this.anchors;
  this.anchorLocations;
  this.menu;
}

Circle.prototype.initiate = function(svg) {
  this.parent = svg;
  this.g = d3.select(this.parent)
    .append("g")
    .on("mouseenter", function() {
      d3.select(this)
        .select(".anchors")
        .style("opacity", 1);
    })
    .on("mouseleave", function() {
      d3.select(this)
        .select(".anchors")
        .style("opacity", 0);
    })
    .node();

  this.el = d3.select(this.g)
    .append(this.name)
    .attr("class", "shape")
    .node();

  this.anchorContainer = d3.select(this.g)
    .append("g")
    .attr("class", "anchors")
    .attr("transform", "translate(" + this.cornerStart[0] + ", " + this.cornerStart[1] + ")").node();

  this.anchorLocations = new AnchorSet({
    "center": [0, 0],
    "top-left": [0, 0],
    "top-middle": [0, 0],
    "top-right": [0, 0],
    "right-middle": [0, 0],
    "bottom-right": [0, 0],
    "bottom-middle": [0, 0],
    "bottom-left": [0, 0],
    "left-middle": [0, 0]
  }, this.anchorContainer);

  this.anchors = this.anchorLocations.create();

  // this.menu = new Menu(this);
};

Circle.prototype.update = function(svg) {
  this.diameter = Math.abs(this.cornerStart[0] - this.cornerEnd[0]);

  d3.select(this.el)
    .attr("cx", this.cornerStart[0])
    .attr("cy", this.cornerStart[1])
    .attr("r", Math.abs(this.cornerStart[0] - this.cornerEnd[0]) / 2);

  this.anchorLocations.update({
    "center": [this.diameter / 2, this.diameter / 2],
    "top-left": [0, 0],
    "top-middle": [this.diameter / 2, 0],
    "top-right": [this.diameter, 0],
    "right-middle": [this.diameter, this.diameter / 2],
    "bottom-right": [this.diameter, this.diameter],
    "bottom-middle": [this.diameter / 2, this.diameter],
    "bottom-left": [0, this.diameter],
    "left-middle": [0, this.diameter / 2]
  });

  d3.select(this.anchorContainer)
    .attr("transform", "translate(" + (this.cornerStart[0] - this.diameter / 2) + ", " + (this.cornerStart[1] - this.diameter / 2) + ")").node();

};