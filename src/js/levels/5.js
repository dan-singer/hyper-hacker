import '../../scss/style.scss';
import '../../scss/levels.scss';
import {Boid} from '../support/boid.js';
import {toggleProfile} from '../support/utils.js';
import { request } from 'https';


document.onmousemove = outputMouse;

function check(){
    let links = document.querySelectorAll('.finish-link');

    for( let link of links){
        link.onclick = checkClick;
    }
}

window.onclick = checkClick;

function outputMouse(event){
    let x = event.clientX;
    let y = event.clientY;

    for(let i=0; i<boidArray.length; i++){
        boidArray[i].target.x = x;
        boidArray[i].target.y = y;
    }
}

function checkClick(event){
    let x = event.clientX;
    let y = event.clientY;
    let links = document.querySelectorAll('.finish-link');
    for(let link of links){
        let rect = link.getBoundingClientRect();
        let centerX = rect.x + (rect.width/2);
        let centerY = rect.y + (rect.height/2);
        
        if(Math.abs(centerX - x) < 50){
            winCondition();
        } else if(Math.abs(centerY - y) < 10){
            winCondition();
        }
    }
}

let boidArray = []; //array of beautiful boids
let numLinks = 2;
let numBoids = 150;
let counter=0;
let timeCounter = 0;

function init() {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
    console.log("Let's see how well you remember your physics!");
    console.log("Use print() to print out the current flock");
    console.log("Use setvelocity(int) to set the flock's velocity");
    console.log("Use setAcceleration(int) to set the flock's acceleration");
    console.log("Use setSpeed(int) to set the flock's maximum speed");

    setTimeout(makeFlock, 2000);
}


function winCondition(e){
    console.log("HERE");
    const csrf = document.querySelector('#_csrf').value;
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));
    const links = document.querySelectorAll(".finish-link");

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

function updateBoids(timestamp){
    destroyBoids();
    makeBoids();

    let elapsedtime = 0.1;

    if(timeCounter >0){
        elapsedtime = timestamp-timeCounter;
    }

    for(let boid of boidArray){
        //calcCentroid();
        boid.Update(elapsedtime);
    }

    timeCounter = timestamp;

    requestAnimationFrame(updateBoids);
    
}

function makeBoids(){
    for(let i=numLinks; i<boidArray.length; i++){
        let boid = document.createElement('div');
        boid.style.top = boidArray[i].position.y +'px';
        boid.style.left= boidArray[i].position.x + 'px';
        boid.setAttribute("class", "boid");
        let content = document.createElement('p');
        content.innerHTML= "CLICK ME";
        boid.appendChild(content);
        document.body.appendChild(boid);
    }

    for(let i = 0; i<numLinks; i++){
        let finalBoid = document.createElement('a');
        finalBoid.style.top = boidArray[i].position.y +'px';
        finalBoid.style.left= boidArray[i].position.x + 'px';
        finalBoid.setAttribute("class", "finish-link linkBoid");
        finalBoid.innerHTML= "Click Here";
        document.body.appendChild(finalBoid);
        check();
    }

    if(counter> 400){
        numLinks++;
        counter=0;
    }

    counter++

}

function destroyBoids(){
    let boids = document.querySelectorAll(".boid");
    if(boids.length>0){
        for(let boid of boids){
            boid.parentNode.removeChild(boid);
        }
    }

    let links = document.querySelectorAll('.finish-link');
    for(let link of links){
        link.parentNode.removeChild(link);
    }
    

}

function makeFlock(){

    for(let i=0; i<numBoids; i++){
        let newBoid = new Boid();
        boidArray.push(newBoid);
    }

    for(let boid of boidArray){
        boid.boids = boidArray;
    }

    requestAnimationFrame(updateBoids);
}

window.print = () => {
    console.log(boidArray);
};

window.setSpeed = (speed) => {
    if(speed){
        if(typeof speed === 'number'){
            console.log("Setting Speed to: " + speed);
            for(let boid of boidArray){
                boid.maxSpeed = speed*10;
            }
        } else{
            console.log("please enter in a valid number");
        }
    }    
    
};

window.setVelocity = (vel) => {
    if(vel){
        if(typeof vel === 'number'){
            console.log("Setting Velocity to: " + vel);
            for(let boid of boidArray){
                boid.velocity.x = vel;
                boid.velocity.y = vel;
            }
        } else{
            console.log("please enter in a valid number");
        }
        
    }
    
};

window.setAcceleration = (speed) => {
    if(speed){
        if(typeof speed === 'number'){
            console.log("Setting Acceleration to: " + speed);
            for(let boid of boidArray){
                boid.acceleration.x = speed;
                boid.acceleration.y = speed;
            }
        } else{
            console.log("please enter in a valid number");
        }
    }
    
}

window.onload = init;