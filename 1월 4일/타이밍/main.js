let startTime = null;

document.addEventListener('keydown', event => {
    if (startTime === null) {
        startTime = new Date().getTime();
    }
    const elapsedTime = new Date().getTime() - startTime;
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    p.innerText = `브라우저 시작으로부터 : 키가 눌린 시간 ${elapsedTime} ms`;
    p2.innerText = `눌린 키 : ${event.key}`
    document.body.appendChild(p);
    document.body.appendChild(p2);
});