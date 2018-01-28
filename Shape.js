function Shape(type, anchorList, shapeNumber) {
  this.type = type;
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
  this.mapping = {};
}

Shape.prototype.createInitial = function(svg, initial=false) {
  this.parent = svg;
  this.g = d3.select(this.parent)
    .append("g")
    .attr("class", ((initial ? "initial-shape-container " : "") + "shape-container"))
    .attr("id", ((initial ? "" : "layer-") + "shape-container-" + SHAPE_COUNTER))
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
    .append(this.type)
    .attr("class", ((initial ? "initial-shape " : "") + "shape shape-" + this.type))
    .attr("id", "shape-" + SHAPE_COUNTER)
    .node();

  this.anchorContainer = d3.select(this.g)
    .append("g")
    .attr("class", "anchors")
    .style("opacity", 0)
    .attr("transform", "translate(" + this.cornerStart[0] + ", " + this.cornerStart[1] + ")").node();

  this.anchorLocations = new AnchorSet(this.anchorList, this.anchorContainer);

  this.anchorLocations.create();

  for (dimension in this.dimensions) {
    this.mapping[dimension] = {
      "html": "",
      "text": ""
    }
  };
};

Shape.prototype.mapDimensions = function(dropEvent) {
  var dim = dropEvent.target.parentElement.dimension;

  if(vizData.current !== "")
  {
    dropEvent.target.appendChild(vizData.current.cloneNode(true));
  }

  this.mapping[dim]["html"] = dropEvent.target.innerHTML;
  this.mapping[dim]["text"] = dropEvent.target.innerText;
};