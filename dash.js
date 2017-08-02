function drawDashedLine(ctx,sx,sy,tx,ty,color,lineWidth,dashLen){
  var len = cacuDis(sx,sy,tx,ty),
      lineWidth = lineWidth || 0.5,
      dashLen = dashLen || 3,
      num = ~~(len / dashLen);
  ctx.beginPath();
  for(var i=0;i<num;i++){
      var x = sx + (tx - sx) / num * i,
          y = sy + (ty - sy) / num * i;
      ctx[i & 1 ? "lineTo" : "moveTo"](x,y);
  }
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}
//计算两点之间的距离
function cacuDis(sx,sy,tx,ty){
    return Math.sqrt(Math.pow(tx-sx,2)+Math.pow(ty-sy,2));
}

function drawDashRect(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    drawDashedLine(ctx, x1, y1, x2, y2, color);
    drawDashedLine(ctx, x2, y2, x3, y3, color);
    drawDashedLine(ctx, x3, y3, x4, y4, color);
    drawDashedLine(ctx, x4, y4, x1, y1, color);
}
