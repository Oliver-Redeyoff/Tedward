var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function drawLine(){
  ctx.moveTo(10.5,0);
  ctx.lineTo(20.5,10);
  ctx.stroke();
}
