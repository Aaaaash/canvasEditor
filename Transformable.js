class Transformable {
  constructor (canvas, image, coordinate, scale, wrapper, editor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.coordinate = coordinate;
    this.scale = scale;
    this.clientx = null;
    this.clienty = null;
    this.wrapper = wrapper;
    this.editor = editor;

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  _init() {
    this.image.onload = () => {
      const { x, y } = this.coordinate;
      this.ctx.drawImage(image, x, y, image.width * this.scale, image.height * this.scale);
      this.ctx.strokeStyle = 'rgba(227,212,169,0.5)';
      this.ctx.strokeRect(x, y, image.width * this.scale, image.height * this.scale);

      this.wrapper.addEventListener('mousedown', this.handleMouseDown);
    }
  }

  /**
   * 
   * @param {*object} e 拖拽图片鼠标点击事件 
   */
  handleMouseDown(e) {
    const { coordinate, scale, editor } = this;
    this.clientx = e.clientX;
    this.clienty = e.clientY;
    if (
      (this.clientx >= coordinate.x && this.clientx <= image.width * scale + coordinate.x)
      &&
      (this.clienty >= coordinate.y && this.clienty <= image.height * scale + coordinate.y)) {
      document.removeEventListener('mousemove', editor.handleMouseMove);
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  /**
   * 
   * @param {*object} e 拖拽图片鼠标移动事件 
   */
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
      this.wrapper.addEventListener('mousedown', this.editor.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }
}
