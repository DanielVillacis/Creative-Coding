const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const animate = () =>{
  console.log('domestika');
  requestAnimationFrame(animate);
};
//animate();

const settings = {
  dimensions: [ 1080, 1080 ],
  animate : true
};

const sketch = ({ context, width, height }) => {

  const agents = [];

  for(let i = 0; i < 45; i++){

    const x = random.range(0,width);
    const y = random.range(0, height);

    agents.push(new Agent(x,y));
  }


  return ({ context, width, height }) => {
    //var my_gradient = context.createLinearGradient(0,0,0,170);
    //my_gradient.addColorStop(0,'black');
    //my_gradient.addColorStop(1,'white');

    context.fillStyle = 'rgb(10,10,7)';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; i++){
      const agent = agents[i];

      for(let j = i+1; j < agents.length; j++){
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if(dist > 220) continue;

        context.lineWidth = math.mapRange(dist, 0, 5, 25, 1);

        context.beginPath();
        context.moveTo(agent.pos.x , agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
        context.stroke();
      }
    }

    agents.forEach(agent =>{
      agent.update();
      agent.draw(context);
      agent.wrap(width,height);
    });
  };
};

canvasSketch(sketch, settings);


class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Agent{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-1,1), random.range(-1,1));
    this.radius = random.range(2,6);
  }


  wrap(width, height) {
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  /*bounce(width, height){
    if(this.pos.x <=0 || this.pos.x >= width){
      this.vel.x *= -1;
    }
    if(this.pos.y <=0 || this.pos.y >= height){
      this.vel.y *= -1;
    }
  }*/


  update(){
   this.pos.x += this.vel.x;
   this.pos.y += this.vel.y;
 }

  draw(context){

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius,0,Math.PI * 2);
    context.fill();
    context.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    context.stroke();

    context.restore();
  }
}