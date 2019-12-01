import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';


const completeLevel = (csrf) => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));
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
}

const init = () => {
    fetch('/level-select-details')
    .then(res => res.json())
    .then(data => {
        ReactDOM.render(    
            <div id="overhead">
                <h1>Level 3: I get by with a little <em>/help</em> from my friends.</h1>
                <h2>You might need to go somewhere else first.</h2>
                <br />
                {data.visitedHelp &&                 
                    <a id="complete" onClick={() => completeLevel(data.csrfToken)}>Click here!</a>
                }
            </div>,
            document.querySelector('#app')
        );
    });
}

window.onload = init;