function ScoreEnemy(x, y) {
    this.x = x || 0;
    this.y = y || 50;
    this.color = "#FFFFC6";
    this.width = 10;
    this.height = 10;
    this.lineWidth = 1;
    this.score = 0;
    this.angle = 0;
}

ScoreEnemy.prototype.constructor = Actor.prototype.constructor;

ScoreEnemy.prototype.init = function(engine) {
    this.score = 0;
    this.x = ( engine.canvas.width / 2 ) + 50;
};

ScoreEnemy.prototype.update = function(engine) {};

ScoreEnemy.prototype.render = function(engine) {
    var ctx = engine.ctx;
    Utils.drawText(ctx, this.x, this.y, this.score, this.color);
};