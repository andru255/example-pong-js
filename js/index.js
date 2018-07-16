var canvasId = "myCanvas";
var game = new Game(canvasId);

// actors
var player = new Player();
var enemy = new Enemy();
var ball = new Ball();

// scores
var scorePlayer = new ScorePlayer();
var scoreEnemy = new ScoreEnemy();

// adding actors to the game
game.addActor("player", player);
game.addActor("enemy", enemy);
game.addActor("ball", ball);

// adding HUD
game.addActor("scorePlayer", scorePlayer);
game.addActor("scoreEnemy", scoreEnemy);

game.everyPreFrame = function(engine) {
    // decoration line
    var lineSplit = {
        x: engine.canvas.width / 2,
        y: 10,
        width: 2,
        height: engine.canvas.height - 20
    };
    Utils.drawRectangleOn(engine.ctx, lineSplit.x, lineSplit.y, lineSplit.width, lineSplit.height, 1, "#fff");
};
game.start();