
class Vector {
 #x
 #y
 #color
 #width
 #name
 #startX
 #startY
    constructor(x, y, color, width, name, startX, startY) {
      this.#x = x;
      this.#y = y;
      this.#color = color;
      this.#width = width;
      this.#name = name;
      this.#startX = startX;
      this.#startY = startY;
    } 
  
    show() {
      push();
      stroke(this.#color);
      strokeWeight(this.#width);
      fill(this.#color);
      line(this.#startX, this.#startY, this.#startX + this.#x, this.#startY - this.#y);
      text(this.#name, this.#startX + this.#x + 5, this.#startY - this.#y);
      pop();
    }
    scalar(){
      
    }
  }
  
  let v1;
  let v2;
  
  function setup() {
    createCanvas(400, 400);
    textSize(24);
    v1 = new Vector(random(-100,100), random(-100,100), "green", random(1,4), "v1", 0, 0);
    v2 = new Vector(random(-100,100), random(-100,100), "blue", random(1,4),"v2", 0,0);   
  }
  
  function draw() {
    background(220);
    translate(width / 2, height / 2); 
    v1.show();
    v2.show();
  }

