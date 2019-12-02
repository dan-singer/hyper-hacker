import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

let canvas, ctx, numShapes, freeDraw;

const Level7 = (props) => {
    return (
        <div id="canvas">
            <canvas width="100" height="100"></canvas>
        </div>
           
    )
}

function init(){
    ReactDOM.render(
        <Level7 />,
        document.querySelector('#app')
    );

    //https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    numShapes = 0;

    freeDraw = false;

    drawTitle();
}

function drawTitle(){
    ctx.font = '72px VT323';
    ctx.fillStyle = '#33ff00';
    ctx.fillText('Level 7: Art Class', (canvas.width/2)-250, (canvas.height/2)-100);
    ctx.font = '60px VT323';
    ctx.fillText('Draw A Pretty Picture To Proceed',(canvas.width/2)-390, (canvas.height/2));
}

window.setColor = (color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

window.drawRect = (x, y, width, height) => {
    if(typeof(x) === "number" && typeof(y) === "number" && typeof(width) === "number" && typeof(height) === "number"){
        ctx.fillRect(x, y, width, height);
        incrementShapes();
    } else{
        console.log("You need to enter in four numbers to draw a rectangle");
    }
};

window.drawCircle = (x, y, radius) => {
    if(typeof(x) === "number" && typeof(y) === "number" && typeof(radius) === "number"){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
        incrementShapes();
    } else{
        console.log("You need to enter in three numbers to draw a circle");
    }
};

window.drawLine = (x1, y1, x2, y2) => {
    if(typeof(x1) === "number" && typeof(y1) === "number" && typeof(x2) === "number" && typeof(y2) === "number"){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        incrementShapes();
    } else{
        console.log("You need to enter in four numbers to draw a line");
    }
};

window.freeDraw = () => {
    freeDraw = !freeDraw;
    incrementShapes();
};

document.onmousemove = outputMouse;

function outputMouse(event){
    if(freeDraw){
        let x = event.clientX;
        let y = event.clientY;
        ctx.fillRect(x-5, y-5, 10, 10);
    }
}

function incrementShapes(){
    numShapes++;

    if(numShapes > 10){

    }
}

window.onload = init;