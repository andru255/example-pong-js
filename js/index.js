var canvasId = "myCanvas";
var game = new Game(canvasId);

// actors
var player = new Player();
var enemy = new Enemy();
var ball = new Ball();

//adding actors to the game
game.addActor("player", player);
game.addActor("enemy", enemy);
game.addActor("ball", ball);

// starting the game
game.start();