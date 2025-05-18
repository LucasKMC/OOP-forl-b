class Vector {
  #startX;
  #startY;
  #compX;
  #compY;

  constructor(startX, startY, compX, compY) {
    this.#startX = startX;
    this.#startY = startY;
    this.#compX = compX;
    this.#compY = compY;
  }

  get startX() {
    return this.#startX;
  }

  get startY() {
    return this.#startY;
  }

  get compX() {
    return this.#compX;
  }

  get compY() {
    return this.#compY;
  }

  get length(){
    return Math.sqrt(this.#compX**2 + this.#compY**2)
  }

  add(other) {
    return new Vector(
      this.startX + other.startX,
      this.startY + other.startY,
      this.compX + other.compX,
      this.compY + other.compY
    );
  }

  subtract(other) {
    return new Vector(
      this.startX - other.startX,
      this.startY - other.startY,
      this.compX - other.compX,
      this.compY - other.compY
    );
  }
  div(n){
    return new Vector(
      this.startX / n,
      this.startY / n,
      this.compX / n,
      this.compY / n
    );
  }
  normalize() {
    let len = this.length;
    if (len === 0) return new Vector(this.startX, this.startY, 0, 0);
    return new Vector(
      this.startX,
      this.startY,
      this.compX / len,
      this.compY / len
    );
  }
}


class Fish {
  #pos
  #vel
  #color
  #fishWidth
  #fishHeight
     constructor(pos, vel, color, fishWidth, fishHeight) {
       this.#pos = pos;
       this.#vel = vel;
       this.#color = color;
       this.#fishWidth = fishWidth;
       this.#fishHeight = fishHeight;
     } 
     
  get pos() {
    return this.#pos;
  }

  get vel() {
    return this.#vel;
  }

  get color() {
    return this.#color;
  }

  get fishWidth() {
    return this.#fishWidth;
  }

  get fishHeight() {
    return this.#fishHeight;
  }

     show(){
       fill(this.#color)
       triangle(this.#pos.startX, this.#pos.startY, 
               this.#pos.startX-this.#fishWidth, this.#pos.startY-this.#fishHeight/2, 
               this.#pos.startX-this.#fishWidth, this.#pos.startY+this.#fishHeight/2);
       ellipse(this.#pos.startX,this.#pos.startY,this.#fishWidth,this.#fishHeight)
       fill("white")
       rect(this.#pos.startX-this.#fishWidth/8, this.#pos.startY-this.#fishHeight/2,this.#fishWidth/8, this.#fishHeight)
       line(this.#pos.startX,this.#pos.startY,this.#pos.startX+this.#fishWidth/2,this.#pos.startY)
       circle(this.#pos.startX+this.#fishWidth/4,this.#pos.startY-this.#fishHeight/4,3)
     }
     update(){
       this.#pos = this.#pos.add(this.#vel)
   }
}


class PreyFish extends Fish {
  constructor() {
    let pos = new Vector(
      random(40,width-40),
      random(40,height-40),
      random(40,width-40),
      random(40,height-40)
    );
    let vel = new Vector(
      0,
      0,
      random(-width / 300, width / 300),
      random(-height / 300, height / 300)
    );
    super(pos, vel, "orange", 40, 20);
  }

  cohesion(fishArray) {
    let pCenter = new Vector(0, 0, 0, 0);
    let total = 0;
  
    for (let other of fishArray) {
      if (other !== this) {
        pCenter = pCenter.add(other.pos);
        total++;
      }
    }
  
    if (total > 0) {
      pCenter = new Vector(pCenter.startX / total, pCenter.startY / total, 0, 0);
  
      let steerX = (pCenter.startX - this.pos.startX) / 100;
      let steerY = (pCenter.startY - this.pos.startY) / 100;
  
      return new Vector(0, 0, steerX, steerY);
    }
  
    return new Vector(0, 0, 0, 0);
  }

  separation(fishArray) {
    let steer = new Vector(0, 0, 0, 0);
    let desiredSeparation = 25;
  
    for (let other of fishArray) {
      if (other !== this) {
        let diff = new Vector(this.pos, other.pos);
        let d = diff.length();
  
        if (d < desiredSeparation && d > 0) {
          diff.normalize();
          steer.add(diff);
        }
      }
    }
  
    return steer;
  }
  allignemt(fishArray){
    let pVel = new Vector(0,0,0,0);
    let total = 0;
    let chgVelocity = 10;
    for(let other of fishArray){
      if(other !== this){
        pVel = pVel.add(other.vel);
      }
    }

    if (total > 0) {
      pVel.div(total); 
      let steer = pVel.sub(fish.vel);
      steer.div(chgVelocity);
      return steer;
    } else {
      return new Vector(0,0,0,0);
    }
  }
 
}

let fishArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0;i < 50; i++){
    fishArray.push(new PreyFish());
  }
}

function draw() {
  background(0,0,220);
  
  for(i = 0; i < fishArray.length; i++){
    let fish = fishArray[i];
    fish.update();
    fish.show();
  } 
}