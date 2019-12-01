import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const Level3 = (props) => {
    return (
        <div id="overhead">
            <h1>Level 3: I get by with a little <em>/help</em> from my friends.</h1>
            <h2>You might need to go somewhere else first.</h2>
            <br />
            {props.visitedHelp &&                 
                <a id="complete" onClick={() => completeLevel(props.csrf)}>Click here!</a>
            }
        </div>
    )
}

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
            <Level3 visitedHelp={data.visitedHelp} csrf={data.csrfToken} />,
            document.querySelector('#app')
        );
    });
}

window.onload = init;