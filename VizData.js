function VizData() {
  this.data;
  this.current = "";
  this.dataTypes = {};
}

function columnDragStart(columnDragStartEvent) {
    var activeColumn = document.getElementById("active-column").appendChild(columnDragStartEvent.target.cloneNode(true));

    columnDragStartEvent.dataTransfer.setData("Text", columnDragStartEvent.target);

    vizData.current = this;

    activeColumn.style.display = "";
    activeColumn.left = columnDragStartEvent.pageX;
    activeColumn.top = columnDragStartEvent.pageY;
  };

function columnDragEnd(columnDragEndEvent) {
  var activeColumn = document.getElementById("active-column");

  vizData.current = "";

  activeColumn.style.display = "none";
  while (activeColumn.firstChild) {
    activeColumn.removeChild(activeColumn.firstChild);
  }
}

VizData.prototype.show = function() {
  var dataTableContainer = document.getElementById('data-table-display'),
      dataTable,
      headerRow,
      tr,
      td,
      th;

  document.getElementById('data-drop-placeholder-text').style.display = "none";

  while (dataTableContainer.firstChild) {
    dataTableContainer.removeChild(dataTableContainer.firstChild);
  }

  dataTable = document.createElement("table");

  dataTableContainer.appendChild(dataTable);

  headerRow = dataTable.appendChild(document.createElement("tr"));

  (["index"].concat(this.data.columns)).forEach(function(col, i) {
    th = headerRow.appendChild(document.createElement("th")).appendChild(document.createElement("div"));

    th.className = "column-name";
    th.innerText = col;
    th.draggable = "true";
    th.dimension = col;

    th.addEventListener("dragstart", columnDragStart);
    th.addEventListener("dragend", columnDragEnd);
  });

  this.data.forEach(function(row, i, data) {
    tr = dataTable.appendChild(document.createElement("tr"));
    td = tr.appendChild(document.createElement("td")).appendChild(document.createElement("div"));
    td.innerText = i;

    data.columns.forEach(function(col, i) {
      td = tr.appendChild(document.createElement("td")).appendChild(document.createElement("div"));

      td.innerText = row[col];
    });
  });


  dataTableContainer.style.display = "inline-block";
};

VizData.prototype.findDataTypes = function() {
  var self = this,
      columns = self.data.columns;

  columns.forEach(function(column, i, arr) {
    self.dataTypes[column] = {};

    if (!isNaN(self.data[0][column]))
    {
      self.dataTypes[column] = {};
      self.dataTypes[column]["type"] = "number";
      self.dataTypes[column]["domain"] = [0, 0];
    }

    else
      self.dataTypes[column]["type"] = "nan";
  });

  self.dataTypes["index"] = {};
  self.dataTypes["index"]["type"] = "number";
  self.dataTypes["index"]["domain"] = [0, self.data.length];
  self.findDomains();
}

VizData.prototype.findDomains = function() {
  var self = this;

  self.data.columns.forEach(function(column) {
    if(self.dataTypes[column]["type"] !== "number")
      return;

    self.data.forEach(function(d) {
      self.dataTypes[column]["domain"][0] = (+d[column] < self.dataTypes[column]["domain"][0]) ? +d[column] : self.dataTypes[column]["domain"][0];
      self.dataTypes[column]["domain"][1] = ((+d[column] + 1) > self.dataTypes[column]["domain"][1]) ? (+d[column] + 1) : self.dataTypes[column]["domain"][1];
    })
  })
}