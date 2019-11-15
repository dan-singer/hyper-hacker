import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'
import { request } from 'https';

document.onmousemove = outputMouse;

function outputMouse(event){
    let x = event.clientX;
    let y = event.clientY;

    for(let i=0; i<boidArray.length; i++){
        boidArray[i].target.x = x;
        boidArray[i].target.y = y;
    }
}

let boidArray = []; //array of beautiful boids
let numLinks = 2;
let counter=0;
let timeCounter = 0;

function init() {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
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

    setTimeout(makeFlock, 2000);
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

    for(let i=0; i<50; i++){
        let newBoid = new Boid();
        boidArray.push(newBoid);
    }

    requestAnimationFrame(updateBoids);
}

window.slow = slowBoids();

function slowBoids(){

}

//credit to past Emily Turner for doing her IMD project good
class Boid{
    constructor(){ //sets random x and y coordinates from -100 to 100
        this.x = Math.floor(Math.random() * screen.width)-50; //x position of the Boid
        this.y = Math.floor(Math.random() * screen.height)-50; //y position of the Boid
        this.position = {x: this.x, y:this.y}; //position of the Boid
        this.direction = {x:0, y:0};
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.maxSpeed = 50;
        this.maxForce = 8;
        this.centroid = {x: 0, y:0};
        this.alignment = {x:0, y:0};
        this.target = {x:(screen.width/2), y:(screen.height/2)};
        this.neighbors= [];
    }

    ApplyForce(force){
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    Distance(vec1, vec2){ //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
        let a = vec1.x - vec2.y;
        let b = vec1.y - vec2.y;

        let c = Math.sqrt( a*a + b*b);

        return c;
    }

    CalcNeighbors(){
        this.neighbors=[];
        for(let boid of boidArray){
            if(this.Distance(boid.position, this.position) < 30){
                let position = {x: boid.x, y: boid.y};
                this.neighbors.push(position);
            }
        }
    }

    Normalize(vec2){
        let newVec = {x:0, y:0};
        newVec.x = vec2.x / this.Distance({x:0, y:0}, vec2);
        newVec.y = vec2.y / this.Distance({x:0, y:0}, vec2);
        
        return newVec;
    }

    //returns seeking force towards a given target vector
    Seek(aim){
        let desiredVelocity = {x:aim.x-this.position.x, y:aim.y-this.position.y};

        desiredVelocity = this.Normalize(desiredVelocity);

        desiredVelocity.x *= this.maxSpeed;
        desiredVelocity.y *= this.maxSpeed;

        let seekingForce = {x:desiredVelocity.x-this.velocity.x, y:desiredVelocity.y-this.velocity.y};

        return seekingForce;
    }

    //returns fleeing force towards a given target vector
    Flee(aim){
        let desiredVelocity = {x:this.position.x-aim.x, y:this.position.y-aim.y};

        desiredVelocity = this.Normalize(desiredVelocity);

        desiredVelocity.x *= this.maxSpeed;
        desiredVelocity.y *= this.maxSpeed;

        let seekingForce = {x:desiredVelocity.x-this.velocity.x, y:desiredVelocity.y-this.velocity.y};

        return seekingForce;

    }

    ClampVector(vec2, max){
        //if it needs to be clamped
        if(this.Distance(vec2, {x:0, y:0})>max){
            let newVec2 = this.Normalize(vec2);
            newVec2.x *= max;
            newVec2.y *= max;

            return newVec2;
        }

        return vec2;

    }

    CalcSteeringForce(){
        let ultForce = {x:0, y:0};

        let seekForce = this.Seek(this.target);


        this.CalcNeighbors();

        if(this.neighbors.length>0){
            for(let i=0; i<this.neighbors.length; i++){
                let flee = this.Flee({x:this.neighbors[i].x, y:this.neighbors[i].y});
                seekForce.x += flee.x;
                seekForce.y += flee.y;
            }
        }

        ultForce.x += seekForce.x;
        ultForce.y += seekForce.y;

        let clampedForce = this.ClampVector(ultForce, this.maxForce);

        this.ApplyForce(clampedForce);
    }

    UpdatePosition(et){

        et /=1000;

        //adds acceleration to velocity
        this.velocity.x += this.acceleration.x * et;
        this.velocity.y += this.acceleration.y *et;

        //adds velocity to position
        this.position.x += this.velocity.x * et;
        this.position.y += this.velocity.y * et;


        //normalizes the direction
        this.direction = this.Normalize(this.velocity);

        //reseta acceleration to zero for the next frame
        this.acceleration.x = 0;
        this.acceleration.y = 0;

    }

    Update(et){
        this.CalcSteeringForce();
        this.UpdatePosition(et);
    }
}

window.onload = init;