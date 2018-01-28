var ANCHOR_RADIUS = 4;
var SHAPE_COUNTER = 1;
var vizData = new VizData();
var viz = new Viz();
var HEIGHT = 600;
var WIDTH = 900;
var PADDING = {
  "LEFT": 10,
  "RIGHT": 10,
  "TOP": 20,
  "BOTTOM": 20
}

WIDTH = WIDTH - PADDING.LEFT - PADDING.RIGHT;
HEIGHT = HEIGHT - PADDING.TOP - PADDING.BOTTOM;

var constructors = {
  "rect": Rect,
  "circle": Circle
}

function truncateText(text) {
  var truncated = text;

  if (truncated.length > 6) {
      truncated = truncated.substr(0,6) + '...';
  }
  return truncated;
}


function toSentenceCase(text) {
  return text[0].toUpperCase() + text.substr(1);
}