const ul = document.querySelector('ul');
let startTime = null;

document.addEventListener('keydown', event => {
    if (startTime === null) {
        startTime = new Date().getTime();
    }
    const elapsedTime = new Date().getTime() - startTime;

    const li = document.createElement('li');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    span.innerText = `최초로 키가 눌린 시점으로부터 키가 눌린 시간 : ${elapsedTime} ms, `;
    span2.innerText = `눌린 키 : ${event.key}`;
    li.appendChild(span);
    li.appendChild(span2);
    ul.append(li);
});