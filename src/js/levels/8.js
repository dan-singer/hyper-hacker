import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const Level8 = (props) => {
    return (
        <div id="instructions">
            <h1>Level 8: Graceless Degradation</h1>
            <h2>Looks like you've got to mobilize.</h2>
        </div>   
    )
}

const Level8Medium = (props) => {
    return (
        <div id="instructions">
            <h1>Level 8: Graceless Degradation</h1>
            <h2>You're getting closer.</h2>
        </div>   
    )
}

const Level8Small = (props) => {
    return (
        <div id="instructions">
            <h1>Level 8: Graceless Degradation</h1>
            <a className="finish-link">Click here!</a>
        </div>   
    )
}

function checkComplete(){
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

function init(){
    let windowWidth = window.innerWidth;

    if(windowWidth < 500){
        ReactDOM.render(
            <Level8Small />,
            document.querySelector('#app')
        );
        checkComplete();
    } else if(windowWidth < 910){
        ReactDOM.render(
            <Level8Medium />,
            document.querySelector('#app')
        );
    } else{
        ReactDOM.render(
            <Level8 />,
            document.querySelector('#app')
        );
    }
}


window.onload = init;