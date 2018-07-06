function Actor() {
    this.x = 0;
    this.y = 0;
    this.with = 0;
    this.height = 0;
};

Actor.prototype.init = function() {

};

Actor.prototype.update = function() {

};

Actor.prototype.render = function() {

};

function Game(canvasId) {
    this.canvasSelf = document.getElementById(canvasId);
    this.ctx = this.canvasSelf.getContext("2d");
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
    for (actor in this.actors ) {
        this.actors[actor][eventName]();
    }
};

Game.prototype.loop = function(everyFrame) {
    console.log("loop here!");
    this.runActorsWithEvent('update');
    this.runActorsWithEvent('render');
};