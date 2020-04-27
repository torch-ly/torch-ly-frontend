<template>
  <canvas id="screen" width="800" height="800"></canvas>
</template>

<script>
  export default {
    data: {
      return: {
        screenContext: null,
        gkhead: null
      }
    },
    mounted() {
      let screen = document.getElementById("screen");
      let ctx = screen.getContext("2d");
      this.screenContext = ctx;

      ////
      //let gkhead = new Image();
      this.gkhead = new Image;

      let self = this;

      this.gkhead.src = 'https://preview.redd.it/cqxp2xypqo941.jpg?width=640&crop=smart&auto=webp&s=7c81660efae79575e6f19b292b2caa89c24d4e24';

      this.trackTransforms(this.screenContext);
      this.redraw();

      let lastX=screen.width/2, lastY=screen.height/2;

      let dragStart,dragged;

      screen.addEventListener('mousedown',function(evt){
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - screen.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - screen.offsetTop);
        dragStart = self.screenContext.transformedPoint(lastX,lastY);
        dragged = false;
      },false);

      screen.addEventListener('mousemove',function(evt){
        lastX = evt.offsetX || (evt.pageX - screen.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - screen.offsetTop);
        dragged = true;
        if (dragStart){
          let pt = self.screenContext.transformedPoint(lastX,lastY);
          self.screenContext.translate(pt.x-dragStart.x,pt.y-dragStart.y);
          self.redraw();
        }
      },false);

      screen.addEventListener('mouseup',function(evt){
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
      },false);

      let scaleFactor = 1.1;

      let zoom = function(clicks){
        let pt = self.screenContext.transformedPoint(lastX,lastY);
        self.screenContext.translate(pt.x,pt.y);
        let factor = Math.pow(scaleFactor,clicks);
        self.screenContext.scale(factor,factor);
        self.screenContext.translate(-pt.x,-pt.y);
        self.redraw();
      }

      let handleScroll = function(evt){
        let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
      };

      screen.addEventListener('DOMMouseScroll',handleScroll,false);
      screen.addEventListener('mousewheel',handleScroll,false);
    },

    methods: {
      trackTransforms: function (ctx){
        let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        let xform = svg.createSVGMatrix();
        ctx.getTransform = function(){ return xform; };

        let savedTransforms = [];
        let save = ctx.save;
        ctx.save = function(){
          savedTransforms.push(xform.translate(0,0));
          return save.call(ctx);
        };

        let restore = ctx.restore;
        ctx.restore = function(){
          xform = savedTransforms.pop();
          return restore.call(ctx);
        };

        let scale = ctx.scale;
        ctx.scale = function(sx,sy){
          xform = xform.scaleNonUniform(sx,sy);
          return scale.call(ctx,sx,sy);
        };

        let rotate = ctx.rotate;
        ctx.rotate = function(radians){
          xform = xform.rotate(radians*180/Math.PI);
          return rotate.call(ctx,radians);
        };

        let translate = ctx.translate;
        ctx.translate = function(dx,dy){
          xform = xform.translate(dx,dy);
          return translate.call(ctx,dx,dy);
        };

        let transform = ctx.transform;
        ctx.transform = function(a,b,c,d,e,f){
          let m2 = svg.createSVGMatrix();
          m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
          xform = xform.multiply(m2);
          return transform.call(ctx,a,b,c,d,e,f);
        };

        let setTransform = ctx.setTransform;
        ctx.setTransform = function(a,b,c,d,e,f){
          xform.a = a;
          xform.b = b;
          xform.c = c;
          xform.d = d;
          xform.e = e;
          xform.f = f;
          return setTransform.call(ctx,a,b,c,d,e,f);
        };

        let pt  = svg.createSVGPoint();
        ctx.transformedPoint = function(x,y){
          pt.x=x; pt.y=y;
          return pt.matrixTransform(xform.inverse());
        }
      },
      redraw: function() {

        // Clear the entire screen
        let p1 = this.screenContext.transformedPoint(0,0);
        let p2 = this.screenContext.transformedPoint(screen.width,screen.height);
        this.screenContext.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

        this.screenContext.save();
        this.screenContext.setTransform(1,0,0,1,0,0);
        this.screenContext.clearRect(0,0,screen.width,screen.height);
        this.screenContext.restore();

        this.screenContext.drawImage(this.gkhead,0,0);
      }
    }
  }
</script>
