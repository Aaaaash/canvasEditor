function drawDashedLine(ctx,sx,sy,tx,ty,color,lineWidth,dashLen){
  var len = cacuDis(sx,sy,tx,ty),
      lineWidth = lineWidth || 0.5,
      dashLen = dashLen || 4,
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