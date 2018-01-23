function VizData() {
  this.data;
  this.current;
}

VizData.prototype.show = function() {
  document.getElementById('data-drop-placeholder-text').style.display = "none";

  var dataTableContainer = document.getElementById('data-table-display');

  var dataTable = document.createElement("table");

  dataTableContainer.appendChild(dataTable);

  var headerRow = dataTable.appendChild(document.createElement("tr"));
  var th = headerRow.appendChild(document.createElement("th"));

  th.innerText = "index";

  th.draggable = "true";

  th.addEventListener("dragstart", function() {
    vizData.current = this;
  });

  this.data.columns.forEach(function(col, i) {
    th = headerRow.appendChild(document.createElement("th"));

    th.innerText = col;
    th.draggable = "true";

    th.addEventListener("dragstart", function() {
      vizData.current = this;
    });
  });

  this.data.forEach(function(row, i, data) {
    var tr = dataTable.appendChild(document.createElement("tr"));
    var td = tr.appendChild(document.createElement("td"));
    td.innerText = i;

    data.columns.forEach(function(col) {
      var td = tr.appendChild(document.createElement("td"));

      td.innerText = row[col];
    });
  });


  dataTableContainer.style.display = "inline-block";
};