// var c = document.getElementById("myCanvas");
// c.onmousemove = function(){
//     c.style.cursor = "crosshair";
// }
// var ctx = c.getContext("2d");
//
// var nodes = []
// var nodeIndex = 0;
// var selectedNode = 0;
//
// var nodeRadius = 30;
// var canvasWidth = c.width;
// var canvasHeight = c.height;
//
//
// drawNode(100, canvasHeight/2);
//
// c.addEventListener('click', (e) => {
//
//   console.log("click");
//
//   const pos = {
//     x: e.clientX-10,
//     y: e.clientY-94
//   };
//
//   for(node in nodes){
//     var nodeCenter = {
//       x: nodes[node].x,
//       y: nodes[node].y
//     };
//     if(isSelected(pos, nodeCenter)){
//       console.log(node + " is selected");
//       selectedNode = node;
//     }
//   }
//
// });
//
// function drawNode(x,y){
//   ctx.moveTo(x,y);
//   ctx.beginPath();
//   ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
//   ctx.stroke();
//   nodes.push({x:x,y:y,index:nodeIndex, children:[]});
//   nodeIndex += 1;
//   console.log(nodes);
// }
//
// function addChild(){
//   console.log(selectedNode)
//   // add a top node first
//   if(nodes[selectedNode].children.length == 0){
//     nodes[selectedNode].children.push(nodeIndex);
//     drawNode(nodes[selectedNode].x+100, nodes[selectedNode].y-100+nodeIndex*10);
//   }
//   // if top node exists add bottom node
//   else if(nodes[selectedNode].children.length == 1){
//     nodes[selectedNode].children.push(nodeIndex);
//     drawNode(nodes[selectedNode].x+100, nodes[selectedNode].y+100-nodeIndex*10);
//   }
//   // if both exist then limit is reached
//   else if(nodes[selectedNode].children.length == 2){
//     return;
//   }
// }
//
// function hideNode(x,y){
//     ctx.moveTo(x,y);
//     ctx.beginPath();
//     ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
//     ctx.strokeStyle = "white";
//     ctx.lineWidth = 10;
//     ctx.stroke();
//     nodeRemove(nodes, selectedNode);
//     nodeIndex -= 1;
//     console.log(nodes);
// }
//
// function nodeRemove(arr, value) {
//     return arr.filter(function(element){
//         return element != value;
//     });
// }
//
// // post order traversal delete the nodes
// function deleteChildren(){
//     if(selectedNode == 0 || nodes[selectedNode].children.length == 0){
//         return;
//     }
//     let numChildren = nodes[selectedNode].children.length;
//     for(let i = numChildren-1; i>-1; i++){
//         hideNode(nodes[nodes[selectedNode].children[i]].x, nodes[nodes[selectedNode].children[i]].y);
//         nodes[selectedNode].children.push(nodeIndex);
//     }
// }
//
//
// function isSelected(point, node) {
//   console.log(point)
//   console.log(node)
//   return Math.sqrt(Math.pow((point.x-node.x),2) + Math.pow((point.y-node.y),2)) < nodeRadius+20;
// }

var c = document.getElementById("myCanvas");
c.onmousemove = function(){
    c.style.cursor = "crosshair";
};

var ctx = c.getContext("2d");

var root = null;
var selectedNode = null;

var nodeRadius = 30;
var canvasWidth = c.width;
var canvasHeight = c.height;
var branchFactor = 1;

root = drawNode(100, canvasHeight/2, null, null);

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
        if (node.children[0] !== null) {
            stack.push(node.children[0]);
        }
        if (node.children[1] !== null) {
            stack.push(node.children[1]);
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

function drawNode(x,y, parent, left){
    ctx.moveTo(x,y);
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    return {x:x,y:y, parent: parent, children:[null, null], left: left};
}

function addChild(){
    console.log(selectedNode);
    // add a top node first
    if(selectedNode.children[0] === null){
        branchFactor += 2;
        selectedNode.children[0] = drawNode(selectedNode.x+100, selectedNode.y-100+branchFactor*10, selectedNode, true);
    }
    // if top node exists add bottom node
    else if(selectedNode.children[1] === null){
       selectedNode.children[1] = drawNode(selectedNode.x+100, selectedNode.y+100-branchFactor*10, selectedNode, false);
    }
    // if both exist then limit is reached
    else {
        console.log("limit reached");
    }
}

function hideNode(x,y){
    ctx.moveTo(x,y);
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2, true);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.stroke();
}

function nodeRemove(node) {
    if (node !== null) {
        nodeRemove(node.children[0]);
        nodeRemove(node.children[1]);
        node.children[0] = null;
        node.children[1] = null;
        hideNode(node.x, node.y);
        node = null;
    }
}

function nodeRemoveWrapper() {
    nodeRemove(selectedNode);
    console.log(selectedNode);
    if (selectedNode.left) {
        selectedNode.parent.children[0] = null;
    } else {
        selectedNode.parent.children[1] = null;
    }
}

function isSelected(point, node) {
    console.log(point);
    console.log(node);
    return Math.sqrt(Math.pow((point.x-node.x),2) + Math.pow((point.y-node.y),2)) < nodeRadius+20;
}
