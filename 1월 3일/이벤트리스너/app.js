const c = document.querySelector('canvas');

c.addEventListener('click', e => {
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
});

window.addEventListener('keydown', e => {
    console.log(`asdf${asdf}sdfd`);
});