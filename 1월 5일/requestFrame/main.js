// const date = new Date();
// const before = date.getTime();
// setInterval(() => {
//     const now = new Date();
//     console.log(now - before);
// }, 1000);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y + 100);
    ctx.stroke();
    ctx.closePath();
}
requestAnimationFrame(animate);

document.addEventListener('keypress', (e) => {
    console.log(e);
    if (e.key == 'w') {
        y -= 5;
    } else if (e.key == 'a') {
        x -= 5;
    } else if (e.key == 's') {
        y += 5;
    } else if (e.key == 'd') {
        x += 5;
    }
})