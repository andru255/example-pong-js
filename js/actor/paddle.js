function Paddle() {
    this.x = 10;
    this.y = 10;
    this.width = 50;
    this.height = 150;
}

Paddle.prototype.constructor = Actor.prototype.constructor;

Paddle.prototype.init = function() {
    console.log("Paddle init!");
};

Paddle.prototype.update = function() {
    console.log("Paddle update!");
};

Paddle.prototype.render = function() {
    console.log("Paddle render!");
};