import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'
import React from 'react';
import ReactDOM from 'react-dom';

const Level0 = (props) => {
    return (
        <div>
            <div id="overhead">
                <h1>Level 0: Overflowing with Secrets</h1>
                <h2>There are six buttons hiding in the space outside of your reach. One of them completes the level. Find it.</h2>
            </div>

            <a className="finish-link button1">Click here!</a>

            <a className="finish-link button2">Click here!</a>

            <div id="float">
                <a className="finish-link button3">Click here!</a>
            </div>


            <a className="finish-link button4">Click here!</a>

            <div id="cheat">
                <a className="finish-link button5">Click here!</a>
            </div>

            <a id="complete" className="finish-link button6">Click here!</a>
        </div>

        
        )
}

function init() {

    ReactDOM.render(
        <Level0 />,
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
    

    setTimeout(reset, 1000);
}

function reset() {

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
        title.innerHTML = 'Level 0: Overflowing with Secrets';
        let subTitle = document.createElement('h2');
        subTitle.innerHTML= 'There are six buttons hiding in the space outside of your reach. One of them completes the level. Find it.<br><br>And if you think you can get rid of the overlay that easy, you are in for a nasty surprise.';

        overhead.appendChild(title);
        overhead.appendChild(subTitle);
        document.body.appendChild(overhead);
    }
    


    setTimeout(reset, 1000);
}

window.onload = init;

/*
position: fixed;
  width:99vw;
  height:100vh;
  text-align: center;
  background-color: $defaultBackground;

  h1{
    margin-top: 35vh;
    font-size: 4rem;
  }

  h2{
    font-size: 3rem;
    width:50%;
    margin:auto;
  }

*/