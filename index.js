
/**
 * 实例化Editor
 * wrapperCanvas  顶层canvas
 *    内容层所有交互事件被wrapperCanvas代理
 * contentCanvas  内容层canvas
 */
const wrapperCanvas = document.querySelector('#top');
const contentCanvas = document.querySelector('#content');
const width = 600;
const height = 400;
const container = document.querySelector('#container');
const conWidth = container.offsetWidth;
const conHeight = container.offsetHeight;
const color = '#DCDCDC';

const editor = new Editor(wrapperCanvas, contentCanvas, width, height);
editor._init(conWidth, conHeight, color);

/**
 * 实例化图片
 */

const images = [
  'colo.png',
  'boom.png',
  'cup.png',
]

images.forEach((v, i) => {
  const image = new Image();
  image.src = v;
  const tranable = new Transformable(contentCanvas, image, { x: 100 + 100 * i, y: 100 }, 0.5, wrapperCanvas, editor);
  tranable._init();
  const title = document.createElement('p');
  document.body.appendChild(title);
  tranable.onChange = (val) => {
    title.innerHTML = `${v}的x: ${val.moveX}-----${v}的y: ${val.moveY}`;
  }
});
