/* eslint-env node, browser */

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const blobSpecs = {
  number: 5,
  colours: ['green', 'blue', 'red', 'purple', 'orange'],
  sizes: 20,
};

let blobs = new Array();

class Blob {
  constructor(colour, size, xSpeed, ySpeed) {
    this.x = Math.random() * (canvas.width - 2*size) + size;
    this.y = Math.random() * (canvas.height - 2*size) + size;
    this.colour = colour;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = [size, canvas.width-size];
    this.height = [size, canvas.height-size];
  }

  move(){
    // collision with walls
    if (this.x >= this.width[1]){
		this.xSpeed = -1 *Math.abs(this.xSpeed);
    }
	else if (this.x <= this.width[0]) {
		this.xSpeed = Math.abs(this.xSpeed);
	}
    if (this.y >= this.height[1]){
		this.ySpeed = -1*Math.abs(this.ySpeed);
    }
	else if (this.y <= this.height[0]) {
		this.ySpeed = Math.abs(this.ySpeed);
	}

    // collision with blobs
    let tempX = this.x;
    let tempY = this.y;
    this.dist = blobs.map(function(b){
      return Math.sqrt((b.x - tempX)**2 + (b.y - tempY)**2);
    }).filter(function(t){return t <= 40;});

    tempX = null;
    tempY = null;

    if (this.dist.length > 1){
      this.xSpeed = -1*this.xSpeed;
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

  fixOverlap(){
    // initialising loop
    let tempX = this.x;
    let tempY = this.y;
    this.dist = blobs.map(function(b){
      return Math.sqrt((b.x - tempX)**2 + (b.y - tempY)**2);
    }).filter(function(t){return t <= 40;});

    while (this.dist.length > 1){
      this.x = Math.random() * (canvas.width - 2*this.size) + this.size;
      this.y = Math.random() * (canvas.height - 2*this.size) + this.size;
      let tempX = this.x;
      let tempY = this.y;
      this.dist = blobs.map(function(b){
        return Math.sqrt((b.x - tempX)**2 + (b.y - tempY)**2);
      }).filter(function(t){return t <= 40;});
    }
  }
}

const rand = {

  speed: function(mag) {
    return (2*Math.random()-1)*mag;
  },

  colour: function() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}


function drawCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  blobs.forEach(function(obj) {
    obj.draw();
    obj.move();
  })
}

for (let iBlobs = 0; iBlobs < blobSpecs.number; iBlobs ++){
  blobs.push(new Blob(rand.colour(), blobSpecs.sizes,
    rand.speed(2), rand.speed(2)))
}

blobs.forEach(function(obj){
  obj.fixOverlap()
})

setInterval(drawCanvas, 10);
