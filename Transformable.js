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
    this.moveX = coordinate.x;
    this.moveY = coordinate.y;
    this.id = guid();

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClearRect = this.handleClearRect.bind(this);
  }

  _init() {
    this.image.onload = () => {
      const { x, y } = this.coordinate;
      this.ctx.drawImage(this.image, x, y, this.image.width * this.scale, this.image.height * this.scale);
      this.ctx.strokeStyle = 'rgba(227,212,169,0.8)';
      this.ctx.strokeRect(x, y, this.image.width * this.scale, this.image.height * this.scale);

      this.wrapper.addEventListener('mousedown', this.handleMouseDown);
      this.editor._publish('new', this);
    }
  }

  /**
   * 
   * @param {*object} e 拖拽图片鼠标点击事件 
   */
  handleMouseDown(e) {
    const { coordinate, scale, editor, image } = this;
    this.clientx = e.clientX;
    this.clienty = e.clientY;
    if (
      (this.clientx >= coordinate.x && this.clientx <= image.width * scale + coordinate.x)
      &&
      (this.clienty >= coordinate.y && this.clienty <= image.height * scale + coordinate.y)) {
      this.editor._subscribe('move', this.handleClearRect);
      document.removeEventListener('mousemove', editor.handleMouseMove);
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  /**
   * 
   * @param {*object} e 拖拽图片鼠标移动事件 
   */
  handleMouseMove(e) {
    /**
     * 单个拖拽实例鼠标移动时调用editor实例的clearRect方法
     * 只清除自身
     */
    const movex = this.coordinate.x - (this.clientx - e.clientX);
    const movey = this.coordinate.y - (this.clienty - e.clientY);
    this.editor._publish('move', this);
    this.editor._publish('update', {id: this.id, movex, movey});
    // this.ctx.clearRect(this.coordinate.x, this.coordinate.y, image.width * this.scale, image.height * this.scale);
    // this.ctx.clearRect(movex, movey, image.width * this.scale, image.height * this.scale);
    // this.ctx.drawImage(image, movex, movey, image.width * this.scale, image.height * this.scale);
    // this.ctx.strokeStyle = 'rgba(227,212,169,0.5)';
    // this.ctx.strokeRect(movex, movey, image.width * this.scale, image.height * this.scale);
    document.addEventListener('mouseup', () => {
      this.coordinate.x = movex;
      this.coordinate.y = movey;
      this.editor.ubsubscribe('move', this.handleClearRect);
      this.wrapper.addEventListener('mousedown', this.editor.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }
  
  /**
   * 
   * @param {*object} data 
   * 移动时自动调用的回调函数 用于清除画布
   */
  handleClearRect(data) {
    this.editor.handleClearRect(data);
  }
}
