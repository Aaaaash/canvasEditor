class MouseEnterArea {
  constructor (wrapper) {
    this.areaHandleMouseMove = this.areaHandleMouseMove.bind(this);
    document.addEventListener('mousemove', this.areaHandleMouseMove);
  }
  areaHandleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    this.instantiation.map((v) => {
      if (
        (x >= v.moveX && x <= v.image.width * v.scale + v.moveX)
      &&
      (y >= v.moveY && y <= v.image.height * v.scale + v.moveY)
      ) {
        v.strokeDash();
      } else {
        v.clearDash();
      }
    });
  }
}
