const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const width = Number(c.width);
const height = Number(c.height);

ctx.beginPath();
ctx.arc(150, 100, 20, 0, 2*Math.PI);
ctx.stroke();
