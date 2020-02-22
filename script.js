var c = document.getElementById("myCanvas");
c.onmousemove = function(){
    c.style.cursor = "crosshair";
}
var ctx = c.getContext("2d");

var nodes = []
var nodeIndex = 0;
var selectedNode = 0;

var nodeRadius = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;



drawNode(100, canvasHeight/2);

c.addEventListener('click', (e) => {

  console.log("click");

  const pos = {
    x: e.clientX-10,
    y: e.clientY-94
  };

  for(node in nodes){
    var nodeCenter = {
      x: nodes[node].x,
      y: nodes[node].y
    };
    if(isSelected(pos, nodeCenter)){
      console.log(node + " is selected");
      selectedNode = node;
    }
  }

});

function drawNode(x,y){
  ctx.moveTo(x,y);
  ctx.beginPath();
  ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
  ctx.stroke();
  nodes.push({x:x,y:y,index:nodeIndex, children:[]});
  nodeIndex += 1;
  console.log(nodes);
}

function addChild(){
  console.log(selectedNode)
  // add a top node first
  if(nodes[selectedNode].children.length == 0){
    nodes[selectedNode].children.push(nodeIndex);
    drawNode(nodes[selectedNode].x+100, nodes[selectedNode].y-100+nodeIndex*10);
  }
  // if top node exists add bottom node
  else if(nodes[selectedNode].children.length == 1){
    nodes[selectedNode].children.push(nodeIndex);
    drawNode(nodes[selectedNode].x+100, nodes[selectedNode].y+100-nodeIndex*10);
  }
  // if both exist then limit is reached
  else if(nodes[selectedNode].children.length == 2){
    return;
  }
}


function isSelected(point, node) {
  console.log(point)
  console.log(node)
  return Math.sqrt(Math.pow((point.x-node.x),2) + Math.pow((point.y-node.y),2)) < nodeRadius+20;
}
