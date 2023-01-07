const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const h1 = document.querySelector('h1');

class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = 0;
        this.dy = 0;
    }
}

const object = new Object(0, 0, 20, 20);
object.dy = 2;
object.dx = 2;

var animationID = 0;
let startTime = null;
let ST = new Date().getTime();

function update(timeStamp) {
    animationID = requestAnimationFrame(update);
    if (object.x >= canvas.width && object.y >= canvas.height) {
        cancelAnimationFrame(animationID);
        h1.innerText = (new Date().getTime() - startTime).toString();
    }


    const deltaTime = timeStamp - ST;
    console.log(deltaTime);
    ST = timeStamp;
    object.x += object.dx * deltaTime * 0.05;
    object.y += object.dy * deltaTime * 0.05;
    // console.log(`${object.x},${object.dx * deltaTime * 0.05}`);
    // console.log(`${object.y},${object.dx * deltaTime * 0.05}`);


    // object.x += object.dx;
    // object.y += object.dy;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(object.x, object.y, object.width, object.height);
}
document.addEventListener('keydown', event => {
    if (startTime === null) {
        startTime = new Date().getTime(1);
        update();
    }
});