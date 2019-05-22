const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const blobSpecs = {
  number: 5,
  colours: ['green', 'blue', 'red', 'purple', 'orange'],
  sizes: 20,
}

let blobs = new Array();
let blobsRecord = new Array();

class Blob {
  constructor(colour, size, xSpeed, ySpeed){
    this.x = Math.random() * (canvas.width - 2*size) + size;
    this.y = Math.random() * (canvas.height - 2*size) + size;
    this.colour = colour;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = [size, canvas.width-size];
    this.height = [size, canvas.height-size];

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke();
  }

  move(){
    if (this.x >= this.width[1] || this.x <= this.width[0]){
      this.xSpeed = -1 *this.xSpeed;
    }
    if (this.y >= this.height[1] || this.y <= this.height[0]){
      this.ySpeed = -1*this.ySpeed;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke();
  }
}

const rand = {

  speed: function(mag){
    return (2*Math.random()-1)*mag;
  },

  colour: function(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 16)];
    }
    return color;
  }

}



function drawCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  blobs.forEach(function(obj){
    obj.draw()
    obj.move()
  })
}


for (let iBlobs = 0; iBlobs < blobSpecs.number; iBlobs ++){
  blobs.push(new Blob(rand.colour(), blobSpecs.sizes,
    rand.speed(2), rand.speed(2)))
}


setInterval(drawCanvas, 10);
