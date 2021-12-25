const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  //animation : true,
  //fps: 200
  
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';



    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.3;
    let x,y;


    const num = 100;
    const radius = width * 0.35;

    for(let i = 0; i < num; i++){

      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(0.1,0.9),random.range(0.2,0.5));

      context.beginPath();
      context.rect(-w*1,random.range(10, -h*1),w,h);
      context.fill();
      //context.fillRect = (159,0,56)
      context.restore();


      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);


      context.lineWidth = random.range(5,4);
      context.beginPath();
      context.arc(0,0,radius * random.range(0.5,1.2),slice * random.range(1,-12),slice * random.range(1,3));
      context.stroke();
      context.restore();

    }
  };
};

canvasSketch(sketch, settings);
