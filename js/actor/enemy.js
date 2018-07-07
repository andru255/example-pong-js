function Enemy() {
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 150;
    this.color = "#fff000";
}

Enemy.prototype.constructor = Actor.prototype.constructor;

Enemy.prototype.init = function(engine) {
    this.x = (engine.canvas.width - this.width) - 20;
    this.y = (engine.canvas.height - this.height) / 2;
};

Enemy.prototype.update = function() {
};

Enemy.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, this.lineWidth, this.color);
};