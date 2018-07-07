function Player() {
    this.x = 10;
    this.y = 10;
    this.width = 50;
    this.height = 150;
    this.keys = {
        up: 38, 
        down: 40
    };
    this.isKeyDownPressed = false;
    this.isKeyUpPressed = false;
}

Player.prototype.constructor = Actor.prototype.constructor;

Player.prototype.init = function(engine) {
    this.y = ( engine.canvas.height - this.height ) / 2;
    this._keyEvents(engine);
};

Player.prototype.update = function() {
    if (this.isKeyUpPressed) {
        this.y -= 10;
    } else if (this.isKeyDownPressed) {
        this.y += 10;
    }
};

Player.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, this.lineWidth, this.color);
};

// custom player behavior
Player.prototype._keyEvents = function(engine) {
    var that = this;
    document.addEventListener('keydown', function(evt){
        if (that.keys.up == evt.keyCode) {
            that.isKeyUpPressed = true;
        } else if (that.keys.down == evt.keyCode) {
            that.isKeyDownPressed = true;
        }
    });
    document.addEventListener('keyup', function(){
        that.isKeyUpPressed = false;
        that.isKeyDownPressed = false;
    });
};