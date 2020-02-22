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
var nodePlacementLeft = false;
var nodePlacementRight = false;

root = drawNode(100, canvasHeight/2, null, null);

c.addEventListener('click', (e) => {

    console.log("click");

    const pos = {
        x: e.clientX-10,
        y: e.clientY-94
    };

    if (nodePlacementLeft){
        nodePlacementLeft = false;
        selectedNode.children[0] = {x: pos.x, y: pos.y, selectedNode, true};
        return;
    }
    else if(nodePlacementRight){
        nodePlacementRight = false;
        selectedNode.children[1] = {x: pos.x, y: pos.y, selectedNode, false};
        return;
    }

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
        nodePlacementLeft = true;
    }
    // if top node exists add bottom node
    else if(selectedNode.children[1] === null){
        nodePlacementRight = true;
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
