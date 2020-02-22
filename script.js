var c = document.getElementById("myCanvas");
c.onmousemove = function(){
    c.style.cursor = "crosshair";
};

var ctx = c.getContext("2d");

var root = null;
var selectedNode = null;
var placingNode = false;

var nodeRadius = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;
var branchFactor = 1;

root = {x:100, y:canvasHeight/2, left:null, right:null};
root.left = {x:200, y:canvasHeight/2, left:null, right:null};
root.right = {x:200, y:canvasHeight/2-100, left:null, right:null};
draw()

c.addEventListener('click', (e) => {

    console.log("click");

    const pos = {
        x: e.clientX-10,
        y: e.clientY-94
    };

    let stack = [];
    stack.push(root);
    while (stack.length > 0) {
        let node = stack.pop();
        if (node.left !== null) {
            stack.push(node.left);
        }
        if (node.right !== null) {
            stack.push(node.right);
        }

        let nodeCenter = {
            x: node.x,
            y: node.y
        };

        if (isSelected(pos, nodeCenter)) {
            console.log(node + " is selected");
            selectedNode = node;
            break;
        }
    }
});

function drawNode(x,y){
    ctx.moveTo(x,y);
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    //return {x:x,y:y, parent: parent, left:null, right: null};
}

function drawLine(x1, y1, x2, y2){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function isSelected(point, node) {
    console.log(point);
    console.log(node);
    return Math.sqrt(Math.pow((point.x-node.x),2) + Math.pow((point.y-node.y),2)) < nodeRadius+20;
}

// draw each node and lines inbetween parent and child nodes
function draw(){
  ctx.clearRect(0, 0, c.width, c.height);
  recDraw(root);
}
function recDraw(node){
  // draw the current node
  drawNode(node.x, node.y);
  if(node.left !== null){
    // draw left node
    recDraw(node.left);
    // draw line between the two
    drawLine(node.x, node.y, node.left.x, node.left.y);
  }
  if(node.right !== null){
    // draw right node
    recDraw(node.right);
    // draw line between the two
    drawLine(node.x, node.y, node.right.x, node.right.y);
  }
}
