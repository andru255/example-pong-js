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
    this.defaultColor = "#65CBE2";
    this.color = this.defaultColor;
    this.width = this.radius * 2;
    this.height = this.radius;
    this.angle = 0 * Math.PI / 180;
}

Ball.prototype.constructor = Actor.prototype.constructor;

Ball.prototype.init = function(game) {
    this.x = game.canvas.width / 2;
    this.y = game.canvas.height / 2;
    this.velocityX = this.speed;
    this.velocityY = this.speed;
};

Ball.prototype.update = function(game) {
    this._move(game);
    this._checkBounds(game);
};

Ball.prototype.render = function(game) {
    var ctx = game.ctx;
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
Ball.prototype._move = function(game) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    //rotation
    this.angle += this.velocityRadius;
};

Ball.prototype._checkBounds = function(game) {
    // huds
    var scorePlayer = game.actors.scorePlayer;
    var scoreEnemy = game.actors.scoreEnemy;

    // particle Emitter   
    var particleEmitter = game.childrenSurface.particleEmitter;

    // left&right edges
    var wasToLeft = (this.x <= 0);
    var wasToRight = (this.x + (this.width) >= game.canvas.width);

    if (wasToLeft) {
        scoreEnemy.score += 1;
        game.sound.ballOut();
    } else if (wasToRight) {
        scorePlayer.score += 1;
        //sound.ballOut();
    }

    // Reset ball
    if (wasToLeft || wasToRight) {
        this.velocityX = Utils.getRandomValueFromArray([-5, 5]);
        this.velocityY = Utils.getRandomValueFromArray([-5, 5]);
        this.x = game.canvas.width / 2;
        this.y = game.canvas.height / 2;
        this.bounce = this.initialBounce;
    } 

    if ((this.y <= 0)) {
        this.velocityY *= this.bounce;
        game.sound.boundResistance();
        particleEmitter.generate(this.x, this.y, Utils.getRandomValueFromArray([ 0, 180 ]), 1);
    } else if ((this.y + (this.height*2) >= game.canvas.height )) {
        this.velocityY *= this.bounce;
        game.sound.boundResistance();
        particleEmitter.generate(this.x, this.y + (this.height*2), Utils.getRandomValueFromArray([ 0, 180 ]), -1);
    } 
};