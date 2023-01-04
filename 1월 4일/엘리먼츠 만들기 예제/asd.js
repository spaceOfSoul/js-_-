const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
button.innerText = '전송';

document.body.appendChild(form);
form.appendChild(input);
form.appendChild(button);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = document.createElement('p');
    const date = new Date();

    const hour = String(date.getHours());
    const min = String(date.getMinutes());
    const sec = String(date.getSeconds());
    p.innerText = `${input.value}, 시간 : ${hour}:${min}:${sec}`;
    input.value = '';
    document.body.appendChild(p);
});