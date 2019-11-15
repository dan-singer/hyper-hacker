import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'

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

    setTimeout(makeFlock, 5000);
}

function updateBoids(){
    destroyBoids();
    makeBoids();
    for(let boid of boidArray){
        //calcCentroid();
        boid.Update();
    }

    setTimeout(updateBoids, 30);
    
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

    if(counter> 100){
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

    updateBoids();
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
        this.maxSpeed = 5;
        this.maxForce = 2;
        this.centroid = {x: 0, y:0};
        this.alignment = {x:0, y:0};
        this.target = {x:(screen.width/2), y:(screen.height/2)};
        this.neighbors= [];
    }
    CalcNeighbors(){
        this.neighbors=[];
        for(let boid of boidArray){
            if(this.Distance(boid.position, this.position) < 30){
                Console.log("true");
                this.neighbors.push(boid);
            }
        }
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

    CalcSteeringForce(){
        let ultForce = {x:0, y:0};

        //let seekForce = this.Seek(this.centroid);

        //ultForce.x += seekForce.x;
        //ultForce.y += seekForce.y;

        let seekForce = this.Seek(this.target);

        ultForce.x += seekForce.x;
        ultForce.y += seekForce.y;

        if((this.Distance(ultForce, 0)) > this.maxForce){
            ultForce.x /= 2;
            ultForce.y /= 2;
        }

        this.ApplyForce(ultForce);
    }

    UpdatePosition(){
        //adds acceleration to velocity
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        //adds velocity to position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        //normalizes the direction
        this.direction = this.Normalize(this.velocity);

        //reseta acceleration to zero for the next frame
        this.acceleration.x = 0;
        this.acceleration.y = 0;

    }

    Update(){
        this.CalcSteeringForce();
        this.UpdatePosition();
    }
}

window.onload = init;