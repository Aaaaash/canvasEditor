class Transformable extends AutoRender {
  constructor (canvas, image, coordinate, scale, wrapper, editor) {
    super(canvas.getContext('2d'), image, coordinate, scale, wrapper);
    this.initialPosition = coordinate;
    this.image = image;
    this.scale = scale;
    this.wrapper = wrapper;
    this.editor = editor;
    this.movex = null;
    this.movey = null;
    this.clientx = null;
    this.clienty = null;
    this.onChange = null;
    this.id = guid();

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  _init() {
    this.render(null, null, (distance) => {
      this.wrapper.addEventListener('mousedown', this.handleMouseDown);
      this.editor._publish('new', distance);
    });
  }

  /**
   * 
   * @param {*object} e 拖拽图片鼠标点击事件 
   */
  handleMouseDown(e) {
    const { initialPosition, scale, editor, image, renderParams } = this;
    this.clientx = e.clientX;
    this.clienty = e.clientY;
    if (
      (this.clientx >= renderParams.position.x && this.clientx <= renderParams.size.width + renderParams.position.x)
      &&
      (this.clienty >= renderParams.position.y && this.clienty <= renderParams.size.height + renderParams.position.y)) {
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
    const { initialPosition, renderParams } = this;
    let movex = initialPosition.x - (this.clientx - e.clientX);
    let movey = initialPosition.y - (this.clienty - e.clientY);

    /**
     * 拖动时自动吸附以及辅助线
     */
    const { contX, contY, contWidth, contHeight } = this.editor;
    if (movex <= contX + 2) {
      movex = contX;
      this.editor.storkeLine('left');
    } else {
      this.editor.clearStorke('l');
    }

    if (movex + renderParams.size.width >= editor.contWidth + contX - 2) {
      movex = editor.contWidth + contX - renderParams.size.width;
      this.editor.storkeLine('right');
    } else {
      this.editor.clearStorke('r');
    }

    if (movey <= contY + 2) {
      movey = contY;
      this.editor.storkeLine('top');
    } else {
      this.editor.clearStorke('t');
    }
    
    if (movey + renderParams.size.height >= editor.contHeight + contY - 2) {
      movey = editor.contHeight + contY - renderParams.size.height;
      this.editor.storkeLine('bottom');
    } else {
      this.editor.clearStorke('b');
    }

    this.editor._publish('update', {id: this.id, movex, movey});
    this.editor._publish('change', Object.assign({}, this, { moveX: movex, moveY: movey }));
    document.addEventListener('mouseup', () => {
      this.renderParams.position.x = movex;
      this.renderParams.position.y = movey;
      this.editor.ubsubscribe('change');
      this.editor.clearStorke();
      this.wrapper.addEventListener('mousedown', this.editor.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }

  strokeDash() {
    drawDashRect(
      this.ctx,
      this.renderParams.position.x,
      this.renderParams.position.y,
      this.renderParams.position.x + this.renderParams.size.width,
      this.renderParams.position.y,
      this.renderParams.position.x + this.renderParams.size.width,
      this.renderParams.position.y + this.renderParams.size.height,
      this.renderParams.position.x,
      this.renderParams.position.y + this.renderParams.size.height,
      'rgba(227,212,169,1)',
    );
  }

  clearDash() {
    drawDashRect(
      this.ctx,
      this.renderParams.position.x,
      this.renderParams.position.y,
      this.renderParams.position.x + this.renderParams.size.width,
      this.renderParams.position.y,
      this.renderParams.position.x + this.renderParams.size.width,
      this.renderParams.position.y + this.renderParams.size.height,
      this.renderParams.position.x,
      this.renderParams.position.y + this.renderParams.size.height,
      '#FFF',
    );
  }
}
