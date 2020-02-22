var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var nodes = []
var nodeCount = 0;

var nodeDiameter = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;

drawNode(100, canvasHeight/2-nodeDiameter/2);

function drawNode(x,y){
  ctx.moveTo(x,y);
  ctx.beginPath();
  ctx.arc(x, y, nodeDiameter, 0, Math.PI * 2, true);
  ctx.stroke();
  nodes.push([x,y,nodeCount, []])
  nodeCount += 1;
  console.log(nodes);
}

function addChild(index){
  if(nodes[index][3] == []);
}
