let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

const handleMouseDown = (e) => {
  if (e.button !== 2) {
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', handleMouseMove);
  }
}


const handleMouseMove = (e) => {
  lastX = e.clientX - startX;
  lastY = e.clientY - startY;
  topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
  topCtx.fillStyle = 'rgba(227,212,169,0.5)';
  topCtx.fillRect(startX, startY, lastX, lastY);
  document.addEventListener('mouseup', handleMouseUp);
}

const handleMouseUp = (e) => {
  topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
  document.removeEventListener('mousemove', handleMouseMove);
}
