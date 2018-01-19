function Rect() {
  this.name = "rect";
  this.parent;
  this.el;
  this.g;
  this.cornerStart;
  this.cornerEnd;
  this.width;
  this.height;
  this.numberAnchors = 9;
  this.anchorContainer;
  this.anchors,
  this.anchorLocations;
  this.menu;
}

Rect.prototype.initiate = function(svg) {
  this.parent = svg
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

Rect.prototype.update = function(svg) {
  this.width = Math.abs(this.cornerStart[0] - this.cornerEnd[0]);
  this.height = Math.abs(this.cornerStart[1] - this.cornerEnd[1]);

  d3.select(this.el)
    .attr("x", this.cornerStart[0])
    .attr("y", this.cornerStart[1])
    .attr("width", this.width)
    .attr("height", this.height);

  this.anchorLocations.update({
    "center": [this.width / 2, this.height / 2],
    "top-left": [0, 0],
    "top-middle": [this.width / 2, 0],
    "top-right": [this.width, 0],
    "right-middle": [this.width, this.height / 2],
    "bottom-right": [this.width, this.height],
    "bottom-middle": [this.width / 2, this.height],
    "bottom-left": [0, this.height],
    "left-middle": [0, this.height / 2]
  });
};