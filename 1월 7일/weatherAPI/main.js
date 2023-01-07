const input = document.querySelector('#exampleInputEmail1');
const check = document.querySelector('#exampleCheck1');
const form = document.querySelector('form');
const container = document.querySelector('.container');

const weather_form = document.querySelector('#weather-form');
const city = document.querySelector('#city');
const weather = document.querySelector('#weather');
const temp = document.querySelector('#temp');

const API_KEY = "df270533e09aad28e5ebe593912a705a";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const div = document.createElement('div');
    div.classList.add('alert');
    div.classList.add('alert-primary');
    if (input.value == '') return 0;
    div.innerText = `${input.value}, ${check.checked}`;
    input.value = '';

    container.appendChild(div);
});

function Err() {
    alert('위치 정보를 허용해주세요.');
}

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url).then((res) => res.json()).then((data) => {
        console.log(data);
        city.innerText = `동네 : ${data.name}`;
        weather.innerText = `현재 날씨 : ${data.weather[0].main}`;
        temp.innerText = `기온 : ${data.main.temp}C`;
    });
}, Err);