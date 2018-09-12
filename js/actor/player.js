function Player() {
    this.x = 0;
    this.y = 10;
    this.width = 20;
    this.height = 150;
    this.keys = {
        up: 38, 
        down: 40
    };
    this.isMoveDown = false;
    this.isMoveUp = false;
    this.velocityY = 0;
    this.velocityYMax = 25;
    this.acceleration = 2;
    this.friction = 0.85;
    this.color = "#BC7593";
    this.angle = 0 * Math.PI / 180; //radians
}

Player.prototype.constructor = Actor.prototype.constructor;

Player.prototype.init = function(engine) {
    this.y = ( engine.canvas.height - this.height ) / 2;
    this._keyEvents(engine);
};

Player.prototype.update = function(engine) {
    this._move();
    this._checkBounds(engine);
    this._collisionWithBall(engine);
};

Player.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, this.lineWidth, this.color, this.angle);
};

// custom player behavior
Player.prototype._keyEvents = function(engine) {
    var that = this;
    document.addEventListener('keydown', function(evt){
        if (that.keys.up == evt.keyCode) {
            that.isMoveUp = true;
        } else if (that.keys.down == evt.keyCode) {
            that.isMoveDown = true;
        }
    });
    document.addEventListener('keyup', function(){
        that.isMoveUp = false;
        that.isMoveDown = false;
    });
};

Player.prototype._move = function() {
    if (this.isMoveUp) {
        this.velocityY -= this.acceleration;
    } else if (this.isMoveDown) {
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

Player.prototype._checkBounds = function(engine) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(engine.canvas.height - this.height, this.y);
    this.y = minY;
};

// collision with ball
Player.prototype._collisionWithBall = function(engine) {
    var ball = engine.actors.ball;

    // classic collisions
    if (Utils.itContainsAABB(ball, this)) {
        this.angle = this._getAngleRotateOnCollision(ball);
        ball.x = this.width;
        ball.velocityX *= ball.bounce;
        ball.velocityRadius *= ball.bounce;
        sound.paddleResistance();
    }

    this.angle += (0 - this.angle) * 0.1;
};

Player.prototype._getAngleRotateOnCollision = function(ball) {
    var ballHeight = ball.radius * 2;
    var factor = -(Math.PI * 0.35);
    var diffballYPaddleY = (ball.y + ballHeight) - this.y;
    var sumPaddleHeightAndBallHeight = this.height + ballHeight;
    var radianBallAngle = factor + (diffballYPaddleY / sumPaddleHeightAndBallHeight) * Math.PI * 0.7;
    return radianBallAngle / 2;
};