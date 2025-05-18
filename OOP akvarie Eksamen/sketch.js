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