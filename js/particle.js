var Particle = function(settings) {
    this.initialPosition = {x: 300, y: 300};
    this.needsToRemove = false;
    this.defaults = {
        x: this.initialPosition.x,
        y: this.initialPosition.y,
        width: 2,
        height: 2, 
        color: Utils.parseColor(Math.random() * 0xff00ff),
        accX: 0,
        accY: 0,
        velocityX: 0,
        velocityY: 0,
        angle: 0,
        speed: 5,
        friction: 0.9,
        direction: 0
    };

    this.shape = Object.assign({}, this.defaults, settings);
    var radianAngle = this.shape.angle * Math.PI / 180;
    this.shape.direction = this.shape.direction - radianAngle / 2 + Math.random() * radianAngle;
    this.shape.speed = Utils.getRandomValueFromArray([ 1, 10 ]);
};

Particle.prototype.resetPosition = function() {
    this.shape.x = this.initialPosition.x;
    this.shape.y = this.initialPosition.y;
};

Particle.prototype.render = function(engine, speed) {
   //var friction = this.shape.friction * (Math.random() + 0.3);
   this.shape.y += Math.sin(this.shape.direction) * (this.shape.speed * this.shape.friction);
   this.shape.x += Math.cos(this.shape.direction) * (this.shape.speed * this.shape.friction);

   this.shape.speed *= this.shape.friction;

   if ( this.shape.speed <= 0.1 ) {
    this.needsToRemove = true;
   }

   Utils.drawRectangleOn(engine.ctx, this.shape.x, this.shape.y, this.shape.width, this.shape.height, 1, this.shape.color, this.shape.color);
};