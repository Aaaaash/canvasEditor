
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
 * 实例化一张图片
 */

const image = new Image();
image.src = 'colo.png';
const tranable = new Transformable(contentCanvas, image, { x: 200, y: 200 }, 0.5, wrapperCanvas, editor);
tranable._init();
