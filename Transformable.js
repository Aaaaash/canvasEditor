class Transformable {
  constructor (canvas, image, coordinate, scale) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.coordinate = coordinate;
    this.scale = scale;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.clientx = null;
    this.clienty = null;
  }

  _init() {
    const { x, y } = this.coordinate;
    this.ctx.drawImage(image, x, y, image.width * this.scale, image.height * this.scale);
    this.ctx.strokeStyle = 'rgba(227,212,169,0.5)';
    this.ctx.strokeRect(x, y, image.width * this.scale, image.height * this.scale);
    const _this = this;
    return (e) => {
      const { coordinate, scale } = _this;
      this.clientx = e.clientX;
      this.clienty = e.clientY;
      if (
        (this.clientx >= coordinate.x && this.clientx <= image.width * scale + coordinate.x)
        &&
        (this.clienty >= coordinate.y && this.clienty <= image.height * scale + coordinate.y)) {
        document.addEventListener('mousemove', this.handleMouseMove);
      }
    }
  }

  handleMouseMove(e) {
    const movex = this.coordinate.x - (this.clientx - e.clientX);
    const movey = this.coordinate.y - (this.clienty - e.clientY);
    this.ctx.clearRect(this.coordinate.x, this.coordinate.y, image.width * this.scale, image.height * this.scale);
    this.ctx.clearRect(movex, movey, image.width * this.scale, image.height * this.scale);
    this.ctx.drawImage(image, movex, movey, image.width * this.scale, image.height * this.scale);
    this.ctx.strokeStyle = 'rgba(227,212,169,0.5)';
    this.ctx.strokeRect(movex, movey, image.width * this.scale, image.height * this.scale);
    document.addEventListener('mouseup', () => {
      this.coordinate.x = movex;
      this.coordinate.y = movey;
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }
}
