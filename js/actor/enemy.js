function Enemy() {
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 150;
    this.color = "#fff000";
    this.velocityY = 0;
    this.velocityYMax = 25;
    this.acceleration = 2;
    this.friction = 0.85;
    this.isMoveDown = false;
    this.isMoveUp = false;
    this.angle = 0;
}

Enemy.prototype.constructor = Actor.prototype.constructor;

Enemy.prototype.init = function(engine) {
    this.x = (engine.canvas.width - this.width) - 20;
    this.y = (engine.canvas.height - this.height) / 2;
};

Enemy.prototype.update = function(engine) {
    var ball = engine.actors.ball;

    if(Math.random() < 0.2) {
        this.isMoveDown = false;
        this.isMoveUp = false;
        if(ball.y + ball.height < this.y + (this.height/2)) {
            this.isMoveUp = true;
        } else if(ball.y > this.y + (this.height/2)) {
            this.isMoveDown = true;
        }
    }
    this._move();
    this._checkBounds(engine);
    //this._collisionWithBall(engine);
};

Enemy.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, this.lineWidth, this.color, this.angle);
};

Enemy.prototype._move = function() {
    if(this.isMoveUp) {
        this.velocityY -= this.acceleration;
    } else if(this.isMoveDown) {
        this.velocityY += this.acceleration;
    }
    if (this.velocityY < -this.velocityYMax) {
        this.velocityY = -this.velocityYMax;
    }
    if (this.velocityY > this.velocityYMax) {
        this.velocityY = this.velocityYMax;
    }
    this.velocityY *= this.friction;
    this.y += this.velocityY;
};

Enemy.prototype._checkBounds = function(engine) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(engine.canvas.height - this.height, this.y);
    this.y = minY;
};

// collision with ball
Enemy.prototype._collisionWithBall = function(engine) {
    var ball = engine.actors.ball;
    if (Utils.itContainsAABB(this, ball)) {
        this.angle = this._getAngleRotateOnCollision(ball);
    }
    this.angle += (0 - this.angle) * 0.1;
};

Enemy.prototype._getAngleRotateOnCollision = function(ball) {
    var ballHeight = ball.radius * 2;
    var factor = -(Math.PI * 0.35);
    var diffballYPaddleY = (ball.y + ballHeight) - this.y;
    var sumPaddleHeightAndBallHeight = this.height + ballHeight;
    var radianBallAngle = factor + (diffballYPaddleY / sumPaddleHeightAndBallHeight) * Math.PI * 0.7;
    return radianBallAngle / 2;
};