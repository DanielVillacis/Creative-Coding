const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 960, 1280 ],
  animate : true,
};

let manager, image;
let text = 'A';
let fontSize = 1300;
let fontFamily = 'Times New Roman';


const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');




const sketch = ({ context, width, height }) => {

  // to get and store the data of a pixel
  const cell = 2.5;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    //fontSize = cols * 1.2;

    //typeContext.fillStyle = 'white';
    // typeContext.font = fontSize + 'px' + fontFamily;
    //typeContext.font = `${fontSize}px ${fontFamily}`;     // Use of template literals instead of summing the variables
    //typeContext.textBaseline = 'top';



    //const metrics = typeContext.measureText(img);
    
    //const mx = metrics.actualBoundingBoxLeft * -1;
    //const my = metrics.actualBoundingBoxAscent * -1;
    //const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    //const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    //const tx = (cols - mw) * 0.5 - mx;
    //const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    // typeContext.translate(tx, ty);
    
    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();

    // typeContext.fillText(img,0,0);

    typeContext.drawImage(image, 0, 0, cols, rows); // draw image

    typeContext.restore();


    const typeData = typeContext.getImageData(0, 0, cols, rows).data;


    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(1, '#0d1e2e');
    fill.addColorStop(0.7, '#353a3d');
    fill.addColorStop(0.4, '#232b30');

    context.fillStyle = fill;
    //context.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    //context.fillStyle = 'black';


    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    //context.drawImage(typeCanvas, 0, 0);

    for(let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2.6}px ${fontFamily}`;
      if(Math.random() < 0.1) context.font = `${cell * 7}px ${fontFamily}`;


      //context.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
      context.fillStyle = 'rgb(200,200,200)';

      context.save();
      context.translate(x,y);
      context.translate(cell * 0.5, cell * 0.5);

      //context.fillRect(0, 0, cell, cell);
      // context.beginPath();
      // context.arc(0,0, cell * 0.5, 0, Math.PI*2);
      // context.fill();

      context.fillText(glyph, 0, 0);
      context.restore();
    }
    //context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
  if(v <  50) return ' ';
  if(v < 100) return '. ';
  if(v < 150) return '+';
  if(v < 200) return '0 ';
  
  // For bright images
  // if(v <  50) return '. ';
  // if(v < 100) return '+';
  // if(v < 150) return ' ';
  // if(v < 200) return ' ';

  const glyphs = 'ずδΞ_φω$'.split('');
  //const glyphs = '+=_/'.split('');

  return random.pick(glyphs);
};


const onKeyUp = (e) => {
  // text = e.key.toUpperCase();
  // manager.render();
};

// document.addEventListener('keyup', onKeyUp);

// const start = async () => {
//   manager = await canvasSketch(sketch, settings);
// };
//start();



//const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png';

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const url = 'andres1.png';
  //const img =  await loadMeSomeImage(url);
  //console.log('img width', img.width);
  //console.log('this line');
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

// const start = () => {
//   loadMeSomeImage(url). then(img =>{
//     console.log('img width', img.width);
//   });
//   console.log('this line');
// };

start();












/* 
  We will use promises to load images, for example :
   x = loadMeAnImage()
   x.width()  --> this would not work
   So we have to use a promise
   x = loadMeAnImage() then() x.width; 
*/