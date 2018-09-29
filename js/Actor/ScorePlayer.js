function ScorePlayer(x, y) {
    this.x = x || 0;
    this.y = y || 50;
    this.color = "#BC7593";
    this.width = 10;
    this.height = 10;
    this.lineWidth = 1;
    this.score = 0;
    this.angle = 0;
}

ScorePlayer.prototype.constructor = Actor.prototype.constructor;

ScorePlayer.prototype.init = function(engine) {
    this.score = 0;
    this.x = ( engine.canvas.width / 2 ) - 50;
};

ScorePlayer.prototype.update = function(engine) {};

ScorePlayer.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawText(ctx, this.x, this.y, this.score, this.color);
};