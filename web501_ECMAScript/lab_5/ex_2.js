// convert JS code to ES6 use class alternate for object.prototype
class Shape {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }
};