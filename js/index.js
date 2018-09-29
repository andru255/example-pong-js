// Setup game&soundG
var canvasId = "myCanvas";
var game = new Game(canvasId);
var sound = new Sound();
var particleEmitter = new ParticleEmitter();

// actors
var player = new Player();
var enemy = new Enemy();
var ball = new Ball();

// scores
var scorePlayer = new ScorePlayer();
var scoreEnemy = new ScoreEnemy();

// prompt
var promptWelcome = new PromptWelcome();
var prompt = new Prompt();
var promptResult = new PromptResult();

function setup() {
    // adding actors to the game
    game.addActor("player", player);
    game.addActor("enemy", enemy);
    game.addActor("ball", ball);

    // adding HUD
    game.addActor("scorePlayer", scorePlayer);
    game.addActor("scoreEnemy", scoreEnemy);

    // adding the prompt
    game.addChildSurface("promptWelcome", promptWelcome);
    game.addChildSurface("prompt", prompt);
    game.addChildSurface("promptResult", promptResult);

    // adding particleEmitter
    game.addChildSurface('particleEmitter', particleEmitter);
}

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

window.onload = function() {
    setup();
    game.start();
    handleSound(game.getFeatures().sound.disable);
};

// UI controls
// SOUND
var lnkSoundHandler = document.getElementById("lnkSoundHandler");
var statusHandler = document.getElementById("spnSoundStatus");
function handleSound(byStatus) {
    if ( byStatus ) {
        return {value: false, label: "ON"};
    }
    return {value: true, label: "OFF"};
}
lnkSoundHandler.addEventListener("click", function () {
    var features = game.getFeatures();
    var handle = handleSound(features.sound.disable);
    game.disabledSound = handle.value;
    statusHandler.innerHTML = handle.label;
});