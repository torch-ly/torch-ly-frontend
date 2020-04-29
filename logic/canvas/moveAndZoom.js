import {draw as drawLayers} from "./layers/layerManager";
import {ctx, canvas as screen} from "./main";

export let absPos = {
  x: 0,
  y: 0
};

export function moveAndZoom() {

  trackTransforms();
  redraw();

  let lastX = screen.width / 2, lastY = screen.height / 2;

  let dragStart, dragged;

  screen.addEventListener('mousedown', function (evt) {

    absPos.x = Math.round(evt.clientX - ctx.getTransform().e);
    absPos.y = Math.round(evt.clientY - ctx.getTransform().f);

    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    lastX = evt.offsetX || (evt.pageX - screen.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - screen.offsetTop);
    dragStart = ctx.transformedPoint(lastX, lastY);
    dragged = false;
  }, false);

  screen.addEventListener('mousemove', async function (evt) {
    lastX = evt.offsetX || (evt.pageX - screen.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - screen.offsetTop);
    dragged = true;
    if (dragStart) {
      let pt = ctx.transformedPoint(lastX, lastY);
      ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      redraw();
    }
  }, false);

  screen.addEventListener('mouseup', function (evt) {
    dragStart = null;
    //if (!dragged) zoom(evt.shiftKey ? -1 : 1);
  }, false);

  let scaleFactor = 1.01;

  let zoom = function (clicks) {
    let pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x, pt.y);
    let factor = Math.pow(scaleFactor, clicks);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    redraw();
  }

  let handleScroll = function (evt) {
    let delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    if (delta) zoom(delta);
    return evt.preventDefault() && false;
  };

  screen.addEventListener('DOMMouseScroll', handleScroll, false);
  screen.addEventListener('mousewheel', handleScroll, false);
}

function trackTransforms() {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  let xform = svg.createSVGMatrix();
  ctx.getTransform = function () {
    return xform;
  };

  let savedTransforms = [];
  let save = ctx.save;
  ctx.save = function () {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };

  let restore = ctx.restore;
  ctx.restore = function () {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  let scale = ctx.scale;
  ctx.scale = function (sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };

  let rotate = ctx.rotate;
  ctx.rotate = function (radians) {
    xform = xform.rotate(radians * 180 / Math.PI);
    return rotate.call(ctx, radians);
  };

  let translate = ctx.translate;
  ctx.translate = function (dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };
  let transform = ctx.transform;
  ctx.transform = function (a, b, c, d, e, f) {
    let m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };

  let setTransform = ctx.setTransform;
  ctx.setTransform = function (a, b, c, d, e, f) {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };

  let pt = svg.createSVGPoint();
  ctx.transformedPoint = function (x, y) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  }
}

function redraw() {
  // Clear the entire screen
  let p1 = ctx.transformedPoint(0, 0);
  let p2 = ctx.transformedPoint(screen.width, screen.height);
  ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, screen.width, screen.height);
  ctx.restore();

  drawLayers();
}
