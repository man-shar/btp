function Shape(name, anchorList, shapeNumber) {
  this.name = name;
  this.parent;
  this.el;
  this.g;
  this.cornerStart;
  this.cornerEnd;
  this.numberAnchors = Object.keys(anchorList).length;
  this.anchorList = anchorList;
  this.anchorContainer;
  this.anchorLocations;
  this.tooltip = new Tooltip();
  this.shapeNumber = SHAPE_COUNTER;
}

Shape.prototype.initiate = function(svg) {
  this.parent = svg;
  this.g = d3.select(this.parent)
    .append("g")
    .attr("id", "shape-container-" + SHAPE_COUNTER)
    .node();

  this.g.addEventListener("mouseenter", function() {
      d3.select(this)
        .select(".anchors")
        .style("opacity", 1);
    })

  this.g.addEventListener("mouseleave", function() {
      d3.select(this)
        .select(".anchors")
        .style("opacity", 0);
    });

  this.g.addEventListener("click", function(e) {
    this.shape.tooltip.toggle.call(this, e);
  });

  this.g.shape = this;

  this.el = d3.select(this.g)
    .append(this.name)
    .attr("class", "shape-" + this.name)
    .attr("id", "shape-" + SHAPE_COUNTER)
    .node();

  this.anchorContainer = d3.select(this.g)
    .append("g")
    .attr("class", "anchors")
    .style("opacity", 0)
    .attr("transform", "translate(" + this.cornerStart[0] + ", " + this.cornerStart[1] + ")").node();

  this.anchorLocations = new AnchorSet(this.anchorList, this.anchorContainer);

  this.anchorLocations.create();
};
