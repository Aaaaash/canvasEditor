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
        (x >= v.renderParams.position.x && x <= v.renderParams.size.width + v.renderParams.position.x)
      &&
      (y >= v.renderParams.position.y && y <= v.renderParams.size.height + v.renderParams.position.y)
      ) {
        v.strokeDash();
      } else {
        v.clearDash();
      }
    });
  }
}
