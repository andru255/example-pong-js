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
    this.defaultColor = "#BC7593";
    this.touchedColor = "#000";
    this.color = this.defaultColor;
    this.angle = 0 * Math.PI / 180; //radians
}

Player.prototype.constructor = Actor.prototype.constructor;

Player.prototype.init = function(game) {
    this.y = ( game.canvas.height - this.height ) / 2;
    this._keyEvents(game);
};

Player.prototype.update = function(gameFeatures) {
    this._move();
    this._checkBounds(gameFeatures);
    this._collisionWithBall(gameFeatures);
};

Player.prototype.render = function(game) {
    var ctx = game.ctx;
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, this.lineWidth, this.color, this.angle);
};

// custom player behavior
Player.prototype._keyEvents = function() {
    var that = this;
    document.addEventListener('keydown', function(evt){
        if (that.keys.up == evt.keyCode) {
            that.isMoveUp = true;
        }
        if (that.keys.down == evt.keyCode) {
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
    } 
    
    if (this.isMoveDown) {
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

Player.prototype._checkBounds = function(game) {
    var maxY = Math.max(0, this.y);
    this.y = maxY;
    var minY = Math.min(game.canvas.height - this.height, this.y);
    this.y = minY;
};

// collision with ball
Player.prototype._collisionWithBall = function(gameFeatures) {
    var ball = gameFeatures.actors.ball;
    ball.color = ball.defaultColor;
    this.color = this.defaultColor;
    // classic collisions
    if (Utils.itContainsAABB(ball, this)) {
        this.angle = this._getAngleRotateOnCollision(ball);
        ball.x = this.width;
        ball.velocityX *= ball.bounce;
        ball.velocityRadius *= ball.bounce;
        gameFeatures.sound.paddleResistance();
        particleEmitter.generate(ball.x, ball.y, Utils.getRandomValueFromArray([ -90, 0 ]), -1);
        ball.color = this.touchedColor;
        this.color = this.touchedColor;
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