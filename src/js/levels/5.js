import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'



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
}

function makeBoids(){
    for(let i=0; i<50; i++){
        let boid = document.createElement('div');
        let x = Math.floor(Math.random() * 200)-100;
        let y = Math.floor(Math.random() * 200)-100;
        boid.style.top = y +'px';
        boid.style.left= x + 'px';
        boid.setAttribute("class", "boid");
        let content = document.createElement('p');
        content.innerHTML= "CLICK ME";
        boid.appendChild(content);
        document.body.appendChild(boid);
    }
}

class Boid{
    constructor(){ //sets random x and y coordinates from -100 to 100
        this.x = Math.floor(Math.random() * 200)-100;
        this.y = Math.floor(Math.random() * 200)-100;
        this.position = {x: this.x, y:this.y};
        this.direction = {x:0, y:0};
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.maxSpeed = 10;
        this.maxForce = 10;
        this.centroid = {x: 0, y:0};
        this.alignment = {x:0, y:0};
        this.target = {x:0, y:0};
    }

    ApplyForce(force){
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    CalcMagnitude(vec1, vec2){ //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
        let a = vec1.x - vec2.y;
        let b = vec1.y - vec2.y;

        let c = Math.sqrt( a*a + b*b);

        return c;
    }

    Seek(aim){
        let desiredVelocity = {x:aim.x-this.position.x, y:aim.y-this.position.y};

        desiredVelocity.x = desiredVelocity.x / this.CalcMagnitude({x:0, y:0}, desiredVelocity);
        desiredVelocity.y = desiredVelocity.y / this.CalcMagnitude({x:0, y:0}, desiredVelocity);

        desiredVelocity.x *= this.maxSpeed;
        desiredVelocity.y *= this.maxSpeed;

        let seekingForce = {x:desiredVelocity.x-this.velocity.x, y:desiredVelocity.y-this.velocity.y};

        return seekingForce;
    }

    CalcSteeringForce(){
        let ultForce = {x:0, y:0};

        let seekForce = Seek(this.centroid);

        ultForce.x += seekForce.x;
        ultForce.y += seekForce.y;

        seekForce = Seek(this.alignment);

        ultForce.x += seekForce.x;
        ultForce.y += seekForce.y;

        seekForce = Seek(this.target);

        ultForce.x += seekForce.x;
        ultForce.y += seekForce.y;

        if((this.CalcMagnitude(ultForce, 0)) > this.maxForce){
            ultForce.x /= 2;
            ultForce.y /= 2;
        }

        this.ApplyForce(ultForce);
    }

    UpdatePosition(){

    }

    Update(){
        CalcSteeringForces();
        UpdatePosition();
    }
}