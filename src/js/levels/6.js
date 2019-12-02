import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const Level6 = (props) => {
    return (
        <div id="instructions">
            <h1>Level 6: WebVR</h1>

            <h2>Let's Get Motion Sick</h2>
        </div>       
    )
}

function init(){
    ReactDOM.render(
        <Level6 />,
        document.querySelector('#app')
    );
}

window.onload = init;