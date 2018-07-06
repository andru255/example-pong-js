var canvasId = "myCanvas";
var game = new Game(canvasId);
var player = new Paddle();
var enemy = new Paddle();
var ball = new Ball();

game.addActor("player", player);
game.addActor("enemy", enemy);
game.addActor("ball", ball);

game.start(function(){

});