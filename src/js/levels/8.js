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
            <h2>Looks like you've got to mobilize.</h2>
        </div>   
    )
}

const Level8Small = (props) => {
    return (
        <div id="instructions">
            <h1>Level 8: Graceless Degradation</h1>
            <h2>Looks like you've got to mobilize.</h2>
        </div>   
    )
}


function init(){
    let windowWidth = window.innerWidth;

    switch(windowWidth){
        case 536:
            break;
    }
    ReactDOM.render(
        <Level8 />,
        document.querySelector('#app')
    );
    
}


window.onload = init;