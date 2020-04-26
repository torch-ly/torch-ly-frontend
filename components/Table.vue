<template>
  <canvas id="screen"></canvas>
</template>

<script>
  export default {
    data: {
      return: {
        screenContext: null
      }
    },
    mounted() {
      let screen = document.getElementById("screen");
      let ctx = screen.getContext("2d");

      this.screenContext = ctx;

      this.screenContext.beginPath();
      this.screenContext.arc(95, 50, 40, 0, 2 * Math.PI);
      this.screenContext.stroke();
    },

    methods: {
      moveScreen: function () {
        function redraw(){

          // Clear the entire canvas
          let p1 = this.screenContext.transformedPoint(0,0);
          let p2 = this.screenContext.transformedPoint(canvas.width,canvas.height);
          this.screenContext.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

          this.screenContext.save();
          this.screenContext.setTransform(1,0,0,1,0,0);
          this.screenContext.clearRect(0,0,canvas.width,canvas.height);
          this.screenContext.restore();

          this.screenContext.drawImage(gkhead,0,0);

        }
        redraw();

        let lastX=canvas.width/2, lastY=canvas.height/2;

        let dragStart,dragged;

        canvas.addEventListener('mousedown',function(evt){
          document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragStart = this.screenContext.transformedPoint(lastX,lastY);
          dragged = false;
        },false);

        canvas.addEventListener('mousemove',function(evt){
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragged = true;
          if (dragStart){
            let pt = this.screenContext.transformedPoint(lastX,lastY);
            this.screenContext.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            redraw();
          }
        },false);

        canvas.addEventListener('mouseup',function(evt){
          dragStart = null;
          if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
        },false);

        let scaleFactor = 1.1;

        let zoom = function(clicks){
          let pt = this.screenContext.transformedPoint(lastX,lastY);
          this.screenContext.translate(pt.x,pt.y);
          let factor = Math.pow(scaleFactor,clicks);
          this.screenContext.scale(factor,factor);
          this.screenContext.translate(-pt.x,-pt.y);
          redraw();
        }

        let handleScroll = function(evt){
          let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
          if (delta) zoom(delta);
          return evt.preventDefault() && false;
        };

        canvas.addEventListener('DOMMouseScroll',handleScroll,false);
        canvas.addEventListener('mousewheel',handleScroll,false);
      };

      gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';

      // Adds this.screenContext.getTransform() - returns an SVGMatrix
      // Adds this.screenContext.transformedPoint(x,y) - returns an SVGPoint
      function trackTransforms(this.screenContext){
    let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    let xform = svg.createSVGMatrix();
    this.screenContext.getTransform = function(){ return xform; };

    let savedTransforms = [];
    let save = this.screenContext.save;
    this.screenContext.save = function(){
      savedTransforms.push(xform.translate(0,0));
      return save.call(this.screenContext);
    };

    let restore = this.screenContext.restore;
    this.screenContext.restore = function(){
      xform = savedTransforms.pop();
      return restore.call(this.screenContext);
    };

    let scale = this.screenContext.scale;
    this.screenContext.scale = function(sx,sy){
      xform = xform.scaleNonUniform(sx,sy);
      return scale.call(this.screenContext,sx,sy);
    };

    let rotate = this.screenContext.rotate;
    this.screenContext.rotate = function(radians){
      xform = xform.rotate(radians*180/Math.PI);
      return rotate.call(this.screenContext,radians);
    };

    let translate = this.screenContext.translate;
    this.screenContext.translate = function(dx,dy){
      xform = xform.translate(dx,dy);
      return translate.call(this.screenContext,dx,dy);
    };

    let transform = this.screenContext.transform;
    this.screenContext.transform = function(a,b,c,d,e,f){
      let m2 = svg.createSVGMatrix();
      m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
      xform = xform.multiply(m2);
      return transform.call(this.screenContext,a,b,c,d,e,f);
    };

    let setTransform = this.screenContext.setTransform;
    this.screenContext.setTransform = function(a,b,c,d,e,f){
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(this.screenContext,a,b,c,d,e,f);
    };

    let pt  = svg.createSVGPoint();
    this.screenContext.transformedPoint = function(x,y){
      pt.x=x; pt.y=y;
      return pt.matrixTransform(xform.inverse());
    }
  }
      }
    }
  }
</script>
