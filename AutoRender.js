/**
 * ctx: canvas2d绘图上下文
 * 
 */
class AutoRender {
  constructor (ctx, element, position, scale, wrapper) {
    this.ctx = ctx;
    this.renderParams = {
      element,
      size: {
        width: 0,
        height: 0,
      },
      position,
      scale,
    };
    this.wrapper = wrapper;
  }
  render (x, y, cb) {
    const { element, position, scale } = this.renderParams;
    if (element.tagName === 'IMG') {
      this.renderParams.size.width = element.width * scale;
      this.renderParams.size.height = element.height * scale;
      this.ctx.drawImage(
        element,
        x || position.x,
        y || position.y,
        element.width * scale,
        element.height * scale,
      );
      if (cb) cb(this);
    }
  }
}
