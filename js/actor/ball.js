function Ball(x, y, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 5;
    this.velocityX = 0; 
    this.velocityY = 0; 
    this.bounce = -1;
    this.radius = radius || 20;
    this.lineWidth = 1;
    this.color = "#65CBE2";
    this.width = this.radius;
    this.height = this.radius;
}

Ball.prototype.constructor = Actor.prototype.constructor;

Ball.prototype.init = function(engine) {
    this.x = engine.canvas.width / 2;
    this.y = engine.canvas.height / 2;
    this.velocityX = this.speed;
    this.velocityY = this.speed;
};

Ball.prototype.update = function(engine) {
    this._move(engine);
    this._checkBounds(engine);
};

Ball.prototype.render = function(engine) {
    var ctx = engine.ctx;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, (Math.PI * 2), true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

// custom ball behavior
Ball.prototype._move = function(engine) {
    this.x += this.velocityX;
    this.y += this.velocityY;
};

Ball.prototype._checkBounds = function(engine) {
    if ( (this.x <= 0) || (this.x + (this.width*2) >= engine.canvas.width ) ) {
        this.x = engine.canvas.width / 2;
        this.y = engine.canvas.height / 2;
    } 
    if ( (this.y <= 0) || (this.y + (this.height*2) >= engine.canvas.height ) ) {
        this.velocityY *= this.bounce;
    } 
};