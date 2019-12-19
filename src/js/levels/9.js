import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

let counter = 0;

const Level9 = (props) => {
    return (
        <div id="instructions">
            <h1>Level 9: Clickr</h1>
            <h2>Click the button ten thousand times to complete the level.</h2>
        </div>
    )
}

const Level9Complete = (props) => {
    return (
        <div id="instructions">
            <h1>Level 9: Clickr</h1>
            <h2>You win! Well done.</h2>
            <a className="finish-link">Click here!</a>
        </div>
    )
}

function checkComplete(){
    ReactDOM.render(
        <Level9Complete />,
        document.querySelector('#app')
    );
    const csrf = document.querySelector('#_csrf').value;
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));
    const links = document.querySelectorAll(".finish-link");
    for(let finish of links){
        finish.onclick = e => {
            e.preventDefault();
            fetch(`/level?num=${levelNum}&_csrf=${csrf}`, {
                method: 'POST',
            })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/level-select';
                }
            })
            .catch(err => {
                console.log(err);
            });
        };
    }
}

function increment() {
    if(counter > 9999){
        checkComplete();
    } else{
        counter++;
        if(counter == 69){
            console.log('Nice');
        }
        if(counter == 420){
            console.log("Weed. Blaze.")
        }
        if(counter == 6969){
            console.log('Double Nice!');
        }

        console.log("You have clicked the button " + counter + " times");
    }  
}

function init(){
    ReactDOM.render(
        <Level9 />,
        document.querySelector('#app')
    );

    counter = 0;

    let intro = document.querySelector('#instructions');

    let clickButton = document.createElement('button');
    clickButton.innerHTML = "KEEP ON CLICKING";
    clickButton.style.fontFamily = 'VT323';
    clickButton.style.color = '#33ff00';
    clickButton.style.backgroundColor = '#111';
    clickButton.style.fontSize = '5rem';
    clickButton.style.borderRadius = '20px';
    clickButton.style.border = '3px #33ff00 solid';
    clickButton.style.padding = '2%';
    clickButton.setAttribute('id', 'clicker');
    clickButton.addEventListener("click", increment);

    intro.appendChild(clickButton);
}

window.onload = init;

