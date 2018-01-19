function AnchorSet(anchorList, anchorContainer) {
  this.anchorList = anchorList;
  this.anchorContainer = anchorContainer;
}

AnchorSet.prototype.list = function() {
  anchorNames = Object.keys(this.anchorList);
  var tempAnchorList = this.anchorList;

  return anchorNames.map(function(anchorName) {
    return {
      "location-name": anchorName, 
      "x": tempAnchorList[anchorName][0], 
      "y": tempAnchorList[anchorName][1]
    }
  });
};

AnchorSet.prototype.update = function(locations) {
  this.anchorList = locations;

  d3.select(this.anchorContainer)
    .selectAll(".anchor")
    .data(this.list(), function(d) {
      return d["location-name"];
    })
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
};


AnchorSet.prototype.create = function(object) {
  d3.select(this.anchorContainer)
    .selectAll("circle")
    .data(this.list(), function(d) {
      return d["location-name"];
    })
    .enter()
    .append("circle")
    .attr("class", "anchor")
    .attr("data-location-name", function(d) {
      return d["location-name"];
    })
    .attr("r", ANCHOR_RADIUS);
}