const topCanvas = document.querySelector('#top');
const topCtx = topCanvas.getContext('2d');
const container = document.querySelector('#container');
const content = document.querySelector('#content');
const contentCtx = content.getContext('2d');
const conWidth = container.offsetWidth;
const conHeight = container.offsetHeight;

content.width = conWidth;
content.height = conHeight;

topCanvas.width = conWidth;
topCanvas.height = conHeight;

const contentX = content.width / 2 - 600 / 2;
const contentY = content.height / 2 - 400 / 2;
contentCtx.fillStyle = '#DCDCDC';
contentCtx.fillRect(0, 0, content.width, content.height);
contentCtx.fillStyle = '#FFF';
contentCtx.fillRect(contentX, contentY, 600, 400);

topCanvas.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;
  if ((x >= contentX && x <= 600 + contentX) && (y >= contentY && y <= 400 + contentY)) {
    drawDashedLine(contentCtx, contentX, contentY, 600 + contentX, contentY, 'rgba(227,212,169,1)');
    drawDashedLine(contentCtx, 600 + contentX, contentX, 600 + contentX, 400 + contentY, 'rgba(227,212,169,1)');
    drawDashedLine(contentCtx, contentX, 400 + contentY, 600 + contentX, 400 + contentY, 'rgba(227,212,169,1)');
    drawDashedLine(contentCtx, contentX, contentY, contentX, 400 + contentY, 'rgba(227,212,169,1)');
  } else {
    drawDashedLine(contentCtx, contentX, contentY, 600 + contentX, contentY, '#fff');
    drawDashedLine(contentCtx, 600 + contentX, contentX, 600 + contentX, 400 + contentY, '#fff');
    drawDashedLine(contentCtx, contentX, 400 + contentY, 600 + contentX, 400 + contentY, '#fff');
    drawDashedLine(contentCtx, contentX, contentY, contentX, 400 + contentY, '#fff');
  }
});

topCtx.fillStyle = 'rgba(0,0,0,0)';
topCtx.fillRect(0, 0, topCanvas.width, topCanvas.height);

topCanvas.addEventListener('mousedown', handleMouseDown);
