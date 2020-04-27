export function draw(ctx) {
  let gkhead = new Image;
  gkhead.src = 'https://preview.redd.it/cqxp2xypqo941.jpg?width=640&crop=smart&auto=webp&s=7c81660efae79575e6f19b292b2caa89c24d4e24';

  ctx.drawImage(gkhead,0,0);

  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);
}
