function Layer() {
  this.shapes = [];
  this.initialShape;
  this.g;
  this.type;
  this.layerNumber
}

Layer.prototype.createLayer = function () {
  var self = this;

  var layer = d3.select("#chart")
    .append("g")
    .attr("class", "layer-container")
    .attr("id", "layer-" + self.layerNumber)
    .attr("transform", "translate(" + PADDING.LEFT + ", "  + PADDING.TOP +")");

  layer.selectAll(self.type)
    .data(vizData.data)
    .enter()
    .append(self.type)
    .each(function(d, i) {
      this.shape = new constructors[self.type]();
      this.shape.mapping = self.initialShape.mapping;

      this.shape.createNew(this, layer, i);
    });

  self.initialShape.g.style.display = "none"
  document.getElementById('tooltip').style.display = "none"
}