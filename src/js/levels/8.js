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


function init(){
    let windowWidth = window.innerWidth;

    console.log(windowWidth);

    if(windowWidth < 500){
        ReactDOM.render(
            <Level8Small />,
            document.querySelector('#app')
        );
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