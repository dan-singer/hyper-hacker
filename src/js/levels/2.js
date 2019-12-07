import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const Level2 = (props) => {
    return (
        <div id="cheat">
            <a className="finish-link">Click here!</a>
        </div>        
    )
}

function init() {

    ReactDOM.render(
        <Level2 />,
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
    
    makeGame();

}

function makeGame(){

    setUpDivs();

    let overhead = document.createElement('div');
    overhead.style.position = 'fixed';
    overhead.style.width = '100vw';
    overhead.style.height= '100vh';
    overhead.style.textAlign= 'center';
    overhead.style.backgroundColor='#111';
    overhead.setAttribute("id", "overhead");

    let title = document.createElement('h1');
    title.innerHTML = "Level 2: You've been Reinstated";
    let subTitle = document.createElement('h2');
    subTitle.innerHTML= "It's hard to reach the button under this mess when things keep resetting.";

    overhead.appendChild(title);
    overhead.appendChild(subTitle);
    document.body.appendChild(overhead);


    setTimeout(reset, 1000);
}

function setUpDivs(){
    for(let i=0; i<10; i++){
        let annoyingDiv = document.createElement('div');
        annoyingDiv.style.position = 'fixed';
        annoyingDiv.style.width = '99vw';
        annoyingDiv.style.height= '100vh';
        annoyingDiv.style.textAlign= 'center';
        annoyingDiv.style.backgroundColor='#111';
        annoyingDiv.style.top='0px';
        annoyingDiv.style.left='0px';
        annoyingDiv.setAttribute("class", "reset");
        let content = document.createElement('h2');
        content.innerHTML= "You are on annoying element #" + (10-i) + " out of 10";
        annoyingDiv.appendChild(content);
        document.body.appendChild(annoyingDiv);
    }
}

function reset() {

    let elements = document.querySelectorAll('.reset');

    if(elements.length < 10){
        for(let element of elements){
            element.parentNode.removeChild(element);
        }
        setUpDivs();
    }

    
    if(document.querySelector('#overhead')){
        let overhead = document.querySelector('#overhead');

        if(overhead.style.display !== 'block'){
            overhead.style.display = 'block';
        }
    } else{
        let overhead = document.createElement('div');
        overhead.style.position = 'fixed';
        overhead.style.width = '99vw';
        overhead.style.height= '100vh';
        overhead.style.textAlign= 'center';
        overhead.style.backgroundColor='#111';
        overhead.setAttribute("id", "overhead");

        let title = document.createElement('h1');
        title.innerHTML = "Level 2: You've been Reinstated";
        let subTitle = document.createElement('h2');
        subTitle.innerHTML= "It's hard to reach the button under this mess when things keep resetting.";

        overhead.appendChild(title);
        overhead.appendChild(subTitle);
        document.body.appendChild(overhead);
    }

    setTimeout(reset, 1000);
}

window.onload = init;