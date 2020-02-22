var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var nodes = []
var nodeIndex = 0;

var nodeDiameter = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;

drawNode(100, canvasHeight/2);

function drawNode(x,y){
  ctx.moveTo(x,y);
  ctx.beginPath();
  ctx.arc(x, y, nodeDiameter, 0, Math.PI * 2, true);
  ctx.stroke();
  nodes.push([x,y,nodeIndex, []]);
  nodeIndex += 1;
  console.log(nodes);
}

function addChild(index){
  // add a top node first
  if(nodes[index][3].length == 0){
    nodes[index][3].push(nodeIndex);
    drawNode(nodes[index][0]+100, nodes[index][1]-150+nodeIndex*10);
  }
  // if top node exists add bottom node
  else if(nodes[index][3].length == 1){
    nodes[index][3].push(nodeIndex);
    drawNode(nodes[index][0]+100, nodes[index][1]+150-nodeIndex*10);
  }
  // if both exist then limit is reached
  else if(nodes[index][3].length == 2){
    return;
  }
}
