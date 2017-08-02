class Transformable {
  constructor (canvas, image, coordinate, scale, wrapper, editor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.coordinate = coordinate;
    this.scale = scale;
    this.wrapper = wrapper;
    this.editor = editor;
    this.moveX = coordinate.x;
    this.moveY = coordinate.y;
    this.clientx = null;
    this.clienty = null;
    this.width = null;
    this.height = null;
    this.onChange = null;
    this.id = guid();

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  _init() {
    this.image.onload = () => {
      const { x, y } = this.coordinate;
      this.ctx.drawImage(this.image, x, y, this.image.width * this.scale, this.image.height * this.scale);
      this.width = this.image.width * this.scale;
      this.height = this.image.height * this.scale;
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
      this.editor._subscribe('change', this.onChange);
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
    let movex = this.coordinate.x - (this.clientx - e.clientX);
    let movey = this.coordinate.y - (this.clienty - e.clientY);

    /**
     * 拖动时自动吸附以及辅助线
     */
    const { contX, contY, contWidth, contHeight } = this.editor;

    if (movex <= contX + 5) {
      movex = contX;
      this.editor.storkeLine('left');
    } else {
      this.editor.clearStorke('left');
    }

    if (movex + this.width >= editor.contWidth + contX - 5) {
      movex = editor.contWidth + contX - this.width;
      this.editor.storkeLine('right');
    } else {
      this.editor.clearStorke('right');
    }

    if (movey <= contY + 5) {
      movey = contY;
      this.editor.storkeLine('top');
    } else {
      this.editor.clearStorke('top');
    }
    
    if (movey + this.height >= editor.contHeight + contY - 5) {
      movey = editor.contHeight + contY - this.height;
      this.editor.storkeLine('bottom');
    } else {
      this.editor.clearStorke('bottom');
    }

    this.editor._publish('update', {id: this.id, movex, movey});
    this.editor._publish('change', Object.assign({}, this, { moveX: movex, moveY: movey }));
    document.addEventListener('mouseup', () => {
      this.coordinate.x = movex;
      this.coordinate.y = movey;
      this.editor.ubsubscribe('change');
      this.wrapper.addEventListener('mousedown', this.editor.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }

  strokeDash() {
    drawDashRect(
      this.ctx,
      this.moveX,
      this.moveY,
      this.moveX + this.width,
      this.moveY,
      this.moveX + this.width,
      this.moveY + this.height,
      this.moveX,
      this.moveY + this.height,
      'rgba(227,212,169,1)',
    );
  }

  clearDash() {
    drawDashRect(
      this.ctx,
      this.moveX,
      this.moveY,
      this.moveX + this.width,
      this.moveY,
      this.moveX + this.width,
      this.moveY + this.height,
      this.moveX,
      this.moveY + this.height,
      '#FFF',
    );
  }
}
