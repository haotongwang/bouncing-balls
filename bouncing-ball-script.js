const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');



class Blob {
  constructor(colour, size, xSpeed, ySpeed){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.colour = colour;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke();
  }

  move(){
    if (this.x >= canvas.width || this.x <= 0){
      this.xSpeed = -1 *this.xSpeed;
    }
    if (this.y >= canvas.height || this.y <= 0){
      this.ySpeed = -1*this.ySpeed;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke();
  }
}

const newBlob = new Blob('green', 20, 1, 1);

setInterval(function(){newBlob.move()}, 10);
