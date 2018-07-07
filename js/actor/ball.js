function Ball(x, y, radius) {
    this.x = x || 50;
    this.y = y || 50;
    this.velocityX = 4; 
    this.velocityY = 4; 
    this.bounce = -1;
    this.radius = radius || 10;
    this.lineWidth = 1;
    this.color = "#ff00ff";
    this.width = this.radius * 2;
    this.height = this.radius * 2;
}

Ball.prototype.constructor = Actor.prototype.constructor;

Ball.prototype.init = function(engine) {
    this.x = engine.canvas.width / 2;
    this.y = engine.canvas.height / 2;
};

Ball.prototype.update = function(engine) {
    this._move(engine);
    this._checkBounds(engine);
    this._collisionWithPlayer(engine);
};

Ball.prototype.render = function(engine) {
    var ctx = engine.ctx;
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
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
    if ( (this.x - this.radius <= 0) || (this.x + this.radius >= engine.canvas.width ) ) {
        this.velocityX *= this.bounce;
    } 
    if ( (this.y - this.radius <= 0) || (this.y + this.radius >= engine.canvas.height ) ) {
        this.velocityY *= this.bounce;
    } 
};

// collision with player
Ball.prototype._collisionWithPlayer = function(engine) {
    var player = engine.actors.player;
    if (Utils.itContainsAABB(this, player)) {
        console.log("ball:", this.x, this.y);
        console.log("player:", player.x, player.y);
        this.x = player.x + player.width;
        this.velocityX = -this.velocityX;
    }
}