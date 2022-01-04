const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1920, 1080],
  animate: true
};


const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
};


const sketch = () => {
  return ({ context, width, height, frame }) => {
    // Fill the background with normal colors or random colors (!!!Photosensitivity Warning!!!)
    //context.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    //context.fillStyle = 'hsl(0, 0%, 98%)';
    //context.fillRect(0, 0, width, height);

    // Create a gradient background 
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0.2, '#FF512F');
    fill.addColorStop(1, '#DD2476');
    context.fillStyle = fill;
    context.fillRect(0, 0, width, height);


    // Numbers of rows and columns
    const cols = params.cols;
    const rows = params.rows;
    // Numbers of cells inside the grid
    const numCells = cols * rows;
    // Declaring the width of the grid
    const gridW = width * 0.8;
    const gridH = height * 0.8;
    // Width and height of heach cell
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    // Margins of the grid
    const margX = (width - gridW) * 0.5;
    const margY = (height - gridH) * 0.5;


    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellW;
      const y = row * cellH;

      const w = cellW * 0.8;
      const h = cellH * 0.8;

      const f = params.animate ? frame : params.frame;   // Using turnary operator

      // Generate a random number from the random library to use noise for the sketch
      //const n = random.noise2D(x + frame * 15, y, params.freq); // Use a 2D sketch, will only move on x angle
      const n = random.noise3D(x, y, f * 10, params.freq); // For 3D animation

      const angle = n * Math.PI * params.amp;        // Will generate random numbers between -180 degrees to 180 degrees of rotation

      //const scale = (n + 1) / 2 * 30;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      // Ready to draw 
      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellW * 0.5, cellH * 0.5);
      context.rotate(angle);
      // Width of each line on the canvas
      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.strokeStyle = 'black';
      context.stroke();
      //cuPerc +=2;

      context.restore();
    }


  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
  folder.addInput(params, 'cols', { min: 2, max: 60, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 60, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  //To manipulate the noise and frequencies values into the box
  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amp', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
};


createPane();
canvasSketch(sketch, settings);
