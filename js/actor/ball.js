function Ball(x, y, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 5;
    this.velocityX = 0; 
    this.velocityY = 0; 
    this.velocityRadius = 0.1;
    this.initialBounce = -1;
    this.bounce = this.initialBounce;
    this.radius = radius || 20;
    this.lineWidth = 1;
    this.color = "#65CBE2";
    this.width = this.radius;
    this.height = this.radius;
    this.angle = 0 * Math.PI / 180;
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
    ctx.translate(this.x + this.radius, this.y + this.radius);
    ctx.rotate(this.angle);
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // render debug line rotation
    var lineX = this.x + this.radius;
    var lineY = this.y + this.radius;
    Utils.drawRectangleOn(ctx, lineX, lineY, 1, this.radius, this.lineWidth, "#f00", this.angle);
};

// custom ball behavior
Ball.prototype._move = function(engine) {
    this.x += this.velocityX;
    this.y += this.velocityY;

    //rotation
    this.angle += this.velocityRadius;
};

Ball.prototype._checkBounds = function(engine) {
    // huds
    var scorePlayer = engine.actors.scorePlayer;
    var scoreEnemy = engine.actors.scoreEnemy;
    
    // left&right edges
    var wasToLeft = (this.x <= 0);
    var wasToRight = (this.x + (this.width) >= engine.canvas.width);

    if (wasToLeft) {
        scoreEnemy.score += 1;
    } else if (wasToRight) {
        scorePlayer.score += 1;
    }

    // Reset ball
    if (wasToLeft || wasToRight) {
        this.velocityX = Utils.getRandomValueFromArray([-5, 5]);
        this.velocityY = Utils.getRandomValueFromArray([-5, 5]);
        this.x = engine.canvas.width / 2;
        this.y = engine.canvas.height / 2;
        this.bounce = this.initialBounce;
    } 

    if ( (this.y <= 0) || (this.y + (this.height*2) >= engine.canvas.height ) ) {
        this.velocityY *= this.bounce;
    } 
};