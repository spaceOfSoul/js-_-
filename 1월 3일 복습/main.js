const inputs = document.querySelectorAll(".i");
const ps = document.getElementsByClassName("rp");
const button = document.querySelector('button');
const re = document.querySelector('#refresh');
const h3 = document.querySelector('h3');

let count = 0;

button.addEventListener('click', () => {
    count = 0;
    for (let i = 0; i < inputs.length; i++) {
        // console.log(inputs[i].value);
        if (inputs[i].value != '') {
            count += 1;
            var str = inputs[i].value;
            var result = '';
            for (let j = 0; j < str.length; j++) {
                // console.log(str[j]);
                if (str[j] === str[j].toUpperCase()) { //대문자
                    result += str[j].toLowerCase();
                } else if (str[j] === str[j].toLowerCase()) { //소문자
                    result += str[j].toUpperCase();
                } else {
                    result += str[j];
                }
            }
            ps[i].innerText = result;
        }
    }
    h3.innerText = count.toString();
    setTimeout(() => window.location.reload(), 2000);
});

function solution() {
    console.log('어쩌고')
}