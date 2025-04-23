
class Fish {
 #x
 #y
 #startX
 #startY
 #color
 #fishWidth
 #fishHeight
    constructor(x, y, startX, startY, color, fishWidth, fishHeight) {
      this.#x = x;
      this.#y = y;
      this.#startX = startX;
      this.#startY = startY;
      this.#color = color;
      this.#fishWidth = fishWidth;
      this.#fishHeight = fishHeight;
    } 
  
    show() {
      push();
      fill(this.#color)
      ellipse(this.#x-this.#startX, this.#y-this.#startY, this.#fishWidth, this.#fishHeight)
      triangle(this.#x-this.#startX+this.#fishWidth, this.#y-this.#startY,this.#x-this.#startX+this.#, y2, x3, y3)
      pop();
    }
    scalar(){
      
    }
  }
  
  let v1;

  
  function setup() {
    createCanvas(400, 400);
    v1 = new Fish(200, 200, 0, 0, "green",40, 10);
  }
  
  function draw() {
    background(220);
    v1.show();
  }

