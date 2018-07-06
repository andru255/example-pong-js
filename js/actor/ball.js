function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
}

Ball.prototype.constructor = Actor.prototype.constructor;

Ball.prototype.init = function() {
    console.log("Ball init!");
};

Ball.prototype.update = function() {
    console.log("Ball update!");
};

Ball.prototype.render = function() {
    console.log("Ball render!");
};