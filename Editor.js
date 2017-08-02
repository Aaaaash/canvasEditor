class Editor extends MouseEnterArea {
  constructor (wrapper, content, width, height) {
    super(wrapper);
    this.watchers = {};
    this.wrapper = wrapper;
    this.content = content;
    this.wrapCtx = wrapper.getContext('2d');
    this.contCtx = content.getContext('2d');
    this.contWidth = width;
    this.contHeight = height;
    this.instantiation = [];

    // 拖选框 鼠标点击坐标
    this.startX = null;
    this.startY = null;
    this.contX = null;
    this.contY = null;
    this.wrapWidth = null;
    this.wrapHeight = null;

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleNewInstantiation = this.handleNewInstantiation.bind(this);
    this.handleUpdateInstantiation = this.handleUpdateInstantiation.bind(this);
  }

  /**
   * 
   * @param {*number} w 宽度
   * @param {*number} h 高度
   * 初始化canvas内容区域，指定宽高
   */
  _init(w, h) {
    const { contWidth, contHeight, contCtx, wrapper, content } = this;
    const contX = w / 2 - contWidth / 2;
    const contY = h / 2 - contHeight / 2;
    this.contX = contX;
    this.contY = contY;
    this.wrapWidth = w;
    this.wrapHeight = h;
    wrapper.width = w;
    wrapper.height = h;
    content.width = w;
    content.height = h;

    contCtx.fillStyle = '#DCDCDC';
    contCtx.fillRect(0, 0, w, h);
    contCtx.fillStyle = '#FFF';
    contCtx.fillRect(contX, contY, contWidth, contHeight);

    wrapper.addEventListener('mousedown', this.handleMouseDown);
    this._subscribe('new', this.handleNewInstantiation);
    this._subscribe('update', this.handleUpdateInstantiation);
  }

  /**
   * 
   * @param {*object} e 鼠标落下事件对象
   * 顶层canvas拖选框mousedown事件 
   */
  handleMouseDown(e) {
    if (e.button !== 2) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  /**
   * 
   * @param {*object} e 鼠标移动事件对象
   * 顶层canvas拖选框mousemove事件
   *  
   */
  handleMouseMove(e) {
    const { startX, startY, wrapper, wrapCtx } = this;
    const lastX = e.clientX - startX;
    const lastY = e.clientY - startY;
    wrapCtx.clearRect(0, 0, wrapper.width, wrapper.height);
    wrapCtx.fillStyle = 'rgba(227,212,169,0.5)';
    wrapCtx.fillRect(startX, startY, lastX, lastY);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * 鼠标抬起取消事件
   */
  handleMouseUp() {
    const { wrapCtx, wrapper } = this;
    wrapCtx.clearRect(0, 0, wrapper.width, wrapper.height);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  _publish(event, data) {
    if (this.watchers[event] && this.watchers[event].length) {
      this.watchers[event].forEach(cb => cb(data));
    }
  }

  _subscribe(event, callback) {
    this.watchers[event] = this.watchers[event] || [];
    this.watchers[event].push(callback);
  }

  ubsubscribe(event = null, cb = null) {
    if (cb) {
      if (this.watchers[event] && this.watchers[event].length) {
        this.watchers[event].splice(this.watchers[event].findIndex(callback => Object.is(callback, cb)), 1);
      }
    } else if (event) {
      this.watchers[event] = [];
    } else {
      this.watchers = {};
    }
  }

  /**
   * 
   * @param {*object} transformable 
   * 实例化的transformable对象
   */
  handleNewInstantiation(transformable) {
    this.instantiation.push(transformable);
  }

  handleUpdateInstantiation(data) {
    const { id, movex, movey } = data;
    const { contCtx, contWidth, contHeight, contX, contY, wrapWidth, wrapHeight, instantiation } = this;
    contCtx.clearRect(0, 0, contentCanvas.width, contentCanvas.height);
    contCtx.fillStyle = '#DCDCDC';
    contCtx.fillRect(0, 0, wrapWidth, wrapHeight);
    contCtx.fillStyle = '#FFF';
    contCtx.fillRect(contX, contY, contWidth, contHeight);
    instantiation.map((v) => {
      if (v.id === id) {
        v.moveX = movex;
        v.moveY = movey;
      }
      contCtx.drawImage(v.image, v.moveX, v.moveY, v.image.width * v.scale, v.image.height * v.scale);
    });
  }

  // 辅助线
  storkeLine(direction, color = '#ccc') {
    const { wrapWidth, contWidth, wrapHeight, contHeight, wrapCtx } = this;
    wrapCtx.strokeStyle = color;
    wrapCtx.lineWidth = 1;
    switch (direction) {
      case 'left':
        wrapCtx.beginPath();
        wrapCtx.moveTo(wrapWidth / 2 - contWidth / 2, 0);
        wrapCtx.lineTo(wrapWidth / 2 - contWidth / 2, wrapHeight);
        wrapCtx.stroke();
        break;
      case 'right':
        wrapCtx.beginPath();
        wrapCtx.moveTo(contWidth + (wrapWidth - contWidth) / 2, 0);
        wrapCtx.lineTo(contWidth + (wrapWidth - contWidth) / 2, wrapHeight);
        wrapCtx.stroke();
        break;
      case 'top':
        wrapCtx.beginPath();
        wrapCtx.moveTo(0, wrapHeight / 2 - contHeight / 2);
        wrapCtx.lineTo(wrapWidth, wrapHeight / 2 - contHeight / 2);
        wrapCtx.stroke();
        break;
      case 'bottom':
        wrapCtx.beginPath();
        wrapCtx.moveTo(0, wrapHeight / 2 + contHeight / 2);
        wrapCtx.lineTo(wrapWidth, wrapHeight / 2 + contHeight / 2);
        wrapCtx.stroke();
        break;
      default:
        return;
    }
  }

  clearStorke(direction) {
    this.storkeLine(direction, '#DCDCDC');
  }
}
