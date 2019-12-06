import '../../scss/style.scss';
import '../../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

let canvas, ctx, numShapes, freeDraw, finalImage;

const Level7 = (props) => {
    return (
        <div id="canvas">
            <canvas width="100" height="100"></canvas>
        </div>
           
    )
}

const Level7Done = (props) => {
    return (
        <div id="instructions">
            <h1>Level Complete!</h1>

            <a className="finish-link">Click here!</a>
        </div>   
           
    )
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

function setTrue(){
    freeDraw = true;
}

function setTruent(){
    freeDraw = false;
}

document.onmousemove = outputMouse;

document.onmousedown = setTrue;

document.onmouseup = setTruent;

function outputMouse(event){
    if(freeDraw){
        let x = event.clientX;
        let y = event.clientY;
        ctx.fillRect(x-5, y-5, 10, 10);
    }
}

function incrementShapes(){
    numShapes++;
}

function checkComplete(){
    if(numShapes > 1){
        //https://www.html5canvastutorials.com/advanced/html5-canvas-get-image-data-tutorial/
        let image = ctx.getImageData(0,0,window.innerWidth, window.innerHeight);
        let imageData = image.data;

        let numFilled = 0;

        for(let i = 0, n = imageData.length; i<n; i+=4){
            numFilled += imageData[i+3];
        }

        let percentage = numFilled / (window.innerWidth * window.innerHeight);
        if(percentage > 80){
            completeLevel();
        }else{ 
            setTimeout(checkComplete, 1000);
        }
    }else{
        setTimeout(checkComplete, 1000);
    }   
}

function completeLevel(){

    ReactDOM.render(
        <Level7Done />,
        document.querySelector('#app')
    );

    let finalData = canvas.toDataURL();
    
    finalImage = new Image();

    finalImage.setAttribute('src', finalData);
    finalImage.setAttribute('id', 'finalImage');

    let overhead = document.querySelector('#instructions');

    overhead.appendChild(finalImage);

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
    ReactDOM.render(
        <Level7 />,
        document.querySelector('#app')
    );

    console.log("Welcome to the Canvas Level ie the level equal in shittiness to every water level ever.");
    console.log("Use drawRect, drawCircle, and drawLine to draw shapes on screen");
    console.log("You can also free draw using your mouse");
    console.log("Change colors using setColor");
    console.log("Draw me a beautiful picture to proceed");
    
    setTimeout(drawCanvas, 500);
    
}

function drawCanvas(){
    //https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    numShapes = 0;

    freeDraw = false;

    drawTitle();

    setTimeout(checkComplete, 4000);
}

window.onload = init;