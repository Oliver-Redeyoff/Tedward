var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var nodes = []
var nodeIndex = 0;

var nodeDiameter = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;

drawNode(100, canvasHeight/2);

c.addEventListener('click', (e) => {

  const pos = {
    x: e.clientX,
    y: e.clientY
  };

  for(node in nodes){
    var nodeCenter = {
      x: nodes[node].x,
      y: nodes[node].y
    };
    if(isSelected(pos, nodeCenter)){
      console.log("yay");
    }
  }

});

function drawNode(x,y){
  ctx.moveTo(x,y);
  ctx.beginPath();
  ctx.arc(x, y, nodeDiameter, 0, Math.PI * 2, true);
  ctx.stroke();
  nodes.push({x:x,y:y,index:nodeIndex, children:[]});
  nodeIndex += 1;
  console.log(nodes);
}

function addChild(index){
  // add a top node first
  if(nodes[index][3].length == 0){
    nodes[index].children.push(nodeIndex);
    drawNode(nodes[index].x+100, nodes[index].y-150+nodeIndex*10);
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

function isSelected(point, node) {
  console.log(Math.sqrt((point.x-node.x)/2 + (point.y - node.y)/2))
  return Math.sqrt((point.x-node.x)/2 + (point.y - node.y)/2) < nodeDiameter/2;
}
