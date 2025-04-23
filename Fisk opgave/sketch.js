
class vector {
 #x
 #y
 #color
 #width
 #height

    constructor(x, y, color, width,height) {
      this.#x = x;
      this.#y = y;
      this.#color = color;
      this.#width = width;
      this.#height = height;
      this.#speed = new
 
    } 
  
    show() {
      push();
      fill(this.#color);
      ellipse(this.#x, this.#y,this.#width,this.#height)
      pop();
    }
    scalar(){

      boundaryCheck(){
        if ((this.#pos.x > width) || (this.#pos.x < 0)) {
            this.#vel.x = this.#vel.x * -1;
        }
        if ((this.#pos.y > height) || (this.#pos.y < 0)) {
            this.#vel.y = this.#vel.y * -1;
        }
    }
    }
  }
  
  let v1;
  let v2;
  

  function setup() {
    
    createCanvas(400, 400);
    v1 = new Fish(200, 200,"green", 30, 10);
    v2 = new Fish(20, 20,"green", 30, 10);   
  }
  
  function draw() {
    background(220);
    v1.show();
    v2.show();
    
  }
  

