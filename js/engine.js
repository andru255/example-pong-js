function Actor() {
    this.x = 0;
    this.y = 0;
    this.with = 0;
    this.height = 0;
    this.color = "#ff00ff";
};

Actor.prototype.init = function(engine) {

};

Actor.prototype.update = function(engine) {

};

Actor.prototype.render = function(engine) {

};

function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.actors = {};
    this.hasStarted = false;
};

Game.prototype.start = function(everyFrame) {
    if (!this.hasStarted) {
        this.runActorsWithEvent('init');
        this.hasStarted = true;
    }
    this.loop(everyFrame);
};

Game.prototype.addActor = function(name, actorSelf) {
    this.actors[name] = actorSelf;
};

Game.prototype.runActorsWithEvent = function(eventName) {
    for (var actor in this.actors ) {
        this.actors[actor][eventName](this);
    }
};

Game.prototype.loop = function(everyFrame) {
    var that = this;
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame, that.canvas);
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.runActorsWithEvent('update');
        that.runActorsWithEvent('render');
    })();
};