//credit to past Emily Turner for doing her IMD project good
class Boid{
    constructor(){ //sets random x and y coordinates from -100 to 100
        this.x = Math.floor(Math.random() * screen.width)-50; //x position of the Boid
        this.y = Math.floor(Math.random() * screen.height)-50; //y position of the Boid
        this.position = {x: this.x, y:this.y}; //position of the Boid
        this.direction = {x:0, y:0};
        this.velocity = {x:0, y:0};
        this.acceleration = {x:0, y:0};
        this.maxSpeed = 30;
        this.maxForce = 12;
        this.centroid = {x: 0, y:0};
        this.alignment = {x:0, y:0};
        this.target = {x:(screen.width/2), y:(screen.height/2)};
        this.neighbors= [];
        this.boids =[];
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
        for(let boid of this.boids){
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

export{
    Boid
};