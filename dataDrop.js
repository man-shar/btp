var vizData = new VizData();

document.addEventListener('DOMContentLoaded',function() {
    document.getElementById("selectedFile").onchange = dataDrop;
},false);

window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);

window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

window.addEventListener("dragend",function(e){
  e = e || event;
  e.preventDefault();
},false);

var dataDropDiv = document.getElementById('data-drop-container');

dataDropDiv.addEventListener("drop", dataDrop);

dataDropDiv.addEventListener("click", function() {
  document.getElementById('selectedFile').click();
});

function dataDrop(dataDropEvent) {
  var file;

  if(dataDropEvent.dataTransfer)
    file = dataDropEvent.dataTransfer.files[0];

  else
  {
    file = dataDropEvent.target.files[0]
  }

  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
      vizData.data = d3.csvParse(evt.target.result);
      vizData.show();
    }
  }
}