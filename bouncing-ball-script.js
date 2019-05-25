/* eslint-env node, browser */

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const blobSpecs = {
    number: 3,
    sizes: 20,
};

let blobs = new Array();

class Blob {
    constructor(id, colour, size, xSpeed, ySpeed) {
		this.id = id;
        this.x = Math.random() * (canvas.width - 2 * size) + size;
        this.y = Math.random() * (canvas.height - 2 * size) + size;
        this.colour = colour;
        this.size = size;
        this.xSpeed = xSpeed;
		this.xSpeedNext = this.xSpeed;
        this.ySpeed = ySpeed;
		this.ySpeedNext = this.ySpeed;
        this.width = [size, canvas.width - size];
        this.height = [size, canvas.height - size];
    }

    collisions() {
		// collision with walls
		if (this.x + this.size >= canvas.width) {
			this.xSpeedNext = -1 * Math.abs(this.xSpeed);
			this.x = canvas.width - this.size;
		} else if (this.x - this.size <= 0) {
			this.xSpeedNext = Math.abs(this.xSpeed);
			this.x = this.size;
		}
		if (this.y + this.size >= canvas.height) {
			this.ySpeedNext = -1 * Math.abs(this.ySpeed);
			this.y = canvas.height - this.size;
		} else if (this.y - this.size <= 0) {
			this.ySpeedNext = Math.abs(this.ySpeed);
			this.y = this.size;
		}

        // collision with blobs
        let tempX = this.x;
        let tempY = this.y;
        let dist = {};
		blobs.map(function(b) {
            dist[String(b.id)] = Math.sqrt((b.x - tempX) ** 2 + (b.y - tempY) ** 2);
        });
		this.dist = dist;

        for (let iDist = 0; iDist <= Object.keys(this.dist).length; iDist++) {
			if (this.dist[iDist] <= this.size*2 && this.id != iDist) {
				// debugger
				// remove overlap
				let overlap = this.size*2 - Math.sqrt((this.x-blobs[iDist].x)**2 + (this.y-blobs[iDist].y)**2);
				let theta = Math.atan2(blobs[iDist].y-this.y, blobs[iDist].x-this.x);
				this.x -= overlap*Math.cos(theta);
				this.y -= overlap*Math.sin(theta);

				/* calculating velocities using formula with both masses equal to 1
				https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional */
				//debugger
				let v1 = Math.sqrt(this.xSpeed**2 + this.ySpeed**2);
				let v2 = Math.sqrt(blobs[iDist].xSpeed**2 + blobs[iDist].ySpeed**2);
				let theta1 = Math.atan2(this.ySpeed, this.xSpeed);
				let theta2 = Math.atan2(blobs[iDist].ySpeed, blobs[iDist].xSpeed);
				let phi = Math.atan2(this.y-blobs[iDist].y, this.x-blobs[iDist].x);
				let m1 = 1;
				let m2 = 1;

				this.xSpeedNext = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
				this.ySpeedNext = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);


			}
		}
	}

	move() {
		this.xSpeed = this.xSpeedNext;
		this.ySpeed = this.ySpeedNext;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.stroke();
    }

    // fixOverlap() {
    //     // initialising loop
    //     let tempX = this.x;
    //     let tempY = this.y;
	// 	let size = this.size;
    //     this.dist = blobs.map(function(b) {
    //         return Math.sqrt((b.x - tempX) ** 2 + (b.y - tempY) ** 2);
    //     }).filter(function(t) {
    //         return t <= size*2;
    //     });
	//
    //     while (this.dist.length > 1) {
	// 		// only spawns blobs when there is no overlap
    //         this.x = Math.random() * (canvas.width - 2 * this.size) + this.size;
    //         this.y = Math.random() * (canvas.height - 2 * this.size) + this.size;
    //         let tempX = this.x;
    //         let tempY = this.y;
    //         this.dist = blobs.map(function(b) {
    //             return Math.sqrt((b.x - tempX) ** 2 + (b.y - tempY) ** 2);
    //         }).filter(function(t) {
    //             return t <= 40;
    //         });
    //     }
    // }
}

const rand = {
    speed: function(mag) {
        return (2 * Math.random() - 1) * mag;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	blobs.forEach(function(obj) {
		obj.draw();
		obj.move();
	})
    blobs.forEach(function(obj) {
		obj.collisions();
    })
}

for (let iBlobs = 0; iBlobs < blobSpecs.number; iBlobs++) {
    blobs.push(new Blob(String(iBlobs), rand.colour(), blobSpecs.sizes,
        rand.speed(2), rand.speed(2)))
}

// blobs.push(new Blob(0, 'black', 20, 1, 0));
// blobs.push(new Blob(1, 'black', 20, 0, 0));
// blobs[0].x=100;
// blobs[0].y=100;
// blobs[1].x=250;
// blobs[1].y=100;

setInterval(drawCanvas, 10);
