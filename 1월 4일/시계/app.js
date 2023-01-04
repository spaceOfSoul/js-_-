const clock = document.querySelector("h2#clock");
const ampm = document.querySelector('#check');
let h, m, s, apStr;
apStr = '';

function getClock() {
    const date = new Date();

    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

    const hours = String(h).padStart(2, "0");
    const minute = String(m).padStart(2, "0");
    const second = String(s).padStart(2, "0");

    clock.innerText = `${hours}:${minute}:${second} ${apStr}`;
}

getClock();
setInterval(getClock, 1000);

ampm.addEventListener('click', (e) => {
    console.log(e);
    apStr = '';
    if (ampm.checked) {
        if (h > 12) {
            h -= 12;
            apStr = 'PM';
        } else {
            apStr = 'AM';
        }
    }

    const hours = String(h).padStart(2, "0");
    const minute = String(m).padStart(2, "0");
    const second = String(s).padStart(2, "0");

    clock.innerText = `${hours}:${minute}:${second} ${apStr}`;
});