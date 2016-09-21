// Parsing info from textarea and generating the graph
function readTextArea() {
  var text = document.getElementById("drop-zone").value;
  var lines = text.split('\n');
  var line1 = lines[0].split(' ');
  var numOfV = parseInt(line1[0]);
  var numOfE = parseInt(line1[1]);
  var e = document.getElementById('nodelabel');
  var nodelabel = parseInt(e.options[e.selectedIndex].text);
  var e = document.getElementById('gtype');
  var gtype = e.options[e.selectedIndex].text;
  document.getElementById('draw').disabled = true;
  document.getElementsByClassName('howto')[0].className += ' hide';

  for (var i = nodelabel; i < numOfV+nodelabel; i++) {
    var obj = new Object();
    obj.id = i.toString();
    nodesArray.push(obj);
  }

  for (var i = 1; i < numOfE+1; i++) {
    var obj = new Object();
    var info = lines[i].split(' ');
    obj.source = info[0].toString();
    obj.target = info[1].toString();
    // console.log(nodesArray[2]);
    if (typeof info[2] !== 'undefined') obj.weight = info[2].toString();
    if (gtype === 'directed') obj.directed = true;
    edgeArray.push(obj);
  }

  var instance = greuler({
    target: '#demo', width: 900, height: 650,
    data: {
      linkDistance: 100,
      nodes : nodesArray,
      links: edgeArray
    }
  }).update()
}
var nodesArray = new Array();
var edgeArray = new Array();
var drawButton = document.getElementById("draw");
drawButton.addEventListener('click', readTextArea);

// For Drag and Drop
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.
  var reader = new FileReader();
  reader.onload = function(event) {
    document.getElementById('drop-zone').value = event.target.result;
  }
  reader.readAsText(files[0],"UTF-8");
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
// Setup the Drag and Drop li listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

