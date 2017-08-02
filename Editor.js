class Editor {
  constructor (wrapper, content, width, height) {
    this.watcher = {};
    this.wrapper = wrapper;
    this.content = content;
    this.wrapCtx = wrapper.getContext('2d');
    this.contCtx = content.getContext('2d');
    this.contWidth = width;
    this.contHeight = height;
    
    // 拖选框 鼠标点击坐标
    this.startX = null;
    this.startY = null;

    this._init = this._init.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
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

    wrapper.width = w;
    wrapper.height = h;
    content.width = w;
    content.height = h;

    contCtx.fillStyle = '#DCDCDC';
    contCtx.fillRect(0, 0, w, h);
    contCtx.fillStyle = '#FFF';
    contCtx.fillRect(contX, contY, contWidth, contHeight);

    wrapper.addEventListener('mousedown', this.handleMouseDown);
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

  _publish(ev, data) {
    if (this.watchers[event] && this.watchers[event].length) {
      this.watchers[event].forEach(cb => cb(data));
    }
  }

  _subscribe(ev, callback) {
    this.watchers[event] = this.watchers[event] || [];
    this.watchers[event].push(cb);
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
}
