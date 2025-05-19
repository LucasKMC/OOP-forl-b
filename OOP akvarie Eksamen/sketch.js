class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  div(n) {
    return new Vector(this.x / n, this.y / n);
  }

  normalize() {
    let len = this.length();
    if (len === 0) return new Vector(0, 0);
    return new Vector(this.x / len, this.y / len);
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}


class Fish {
  #pos;
  #vel;
  #color;
  #fishWidth;
  #fishHeight;

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

  set vel(newVel) {
    this.#vel = newVel;
  }

  set pos(newPos) {
    this.#pos = newPos;
  }

  show() {
    fill(this.#color);
    triangle(
      this.#pos.x, this.#pos.y,
      this.#pos.x - this.#fishWidth, this.#pos.y - this.#fishHeight / 2,
      this.#pos.x - this.#fishWidth, this.#pos.y + this.#fishHeight / 2
    );
    ellipse(this.#pos.x, this.#pos.y, this.#fishWidth, this.#fishHeight);
    fill("white");
    rect(this.#pos.x - this.#fishWidth / 8, this.#pos.y - this.#fishHeight / 2, this.#fishWidth / 8, this.#fishHeight);
    line(this.#pos.x, this.#pos.y, this.#pos.x + this.#fishWidth / 2, this.#pos.y);
    circle(this.#pos.x + this.#fishWidth / 4, this.#pos.y - this.#fishHeight / 4, 3);
  }
}


class PreyFish extends Fish {
  constructor() {
    let pos = new Vector(random(40, width - 40), random(40, height - 40));
    let vel = new Vector(random(-2, 2), random(-2, 2));
    super(pos, vel, "orange", 40, 20);
  }

  cohesion(fishArray) {
    let pCenter = new Vector(0, 0);
    let total = 0;

    for (let other of fishArray) {
      if (other !== this) {
        pCenter = pCenter.add(other.pos);
        total++;
      }
    }

    if (total > 0) {
      pCenter = pCenter.div(total);
      let steer = new Vector(
        (pCenter.x - this.pos.x) / 100,
        (pCenter.y - this.pos.y) / 100
      );
      return steer;
    }

    return new Vector(0, 0);
  }

  separation(fishArray) {
    let steer = new Vector(0, 0);
    let desiredSeparation = 25;

    for (let other of fishArray) {
      if (other !== this) {
        let diff = new Vector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
        let d = diff.length();
        if (d < desiredSeparation && d > 0) {
          diff = diff.normalize();
          steer = steer.add(diff);
        }
      }
    }

    return steer;
  }

  alignment(fishArray) {
    let avgVel = new Vector(0, 0);
    let total = 0;
    let chgVelocity = 10;

    for (let other of fishArray) {
      if (other !== this) {
        avgVel = avgVel.add(other.vel);
        total++;
      }
    }

    if (total > 0) {
      avgVel = avgVel.div(total);
      let steer = avgVel.subtract(this.vel).div(chgVelocity);
      return steer;
    }

    return new Vector(0, 0);
  }

  update(fishArray) {
    let coh = this.cohesion(fishArray);
    let sep = this.separation(fishArray);
    let ali = this.alignment(fishArray);

    let steer = coh.add(sep).add(ali);
    this.vel = this.vel.add(steer);

    let maxSpeed = 5;
    if (this.vel.length() > maxSpeed) {
      this.vel = this.vel.normalize().div(1 / maxSpeed);
    }

    this.pos = this.pos.add(this.vel);
  }
}


let fishArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++) {
    fishArray.push(new PreyFish());
  }
}

function draw() {
  background(0, 0, 220);
  for (let i = 0; i < fishArray.length; i++) {
    let fish = fishArray[i];
    fish.update(fishArray);
    fish.show();
  }
}
