function Actor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = "#ff00ff";
};
Actor.prototype.init = function(engine) {};
Actor.prototype.update = function(engine) {};
Actor.prototype.render = function(engine) {};

function ChildSurface() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = "#ff00ff";
};
ChildSurface.prototype.init = function(engine) {};
ChildSurface.prototype.render = function(engine) {};

function Game(canvasId) {
    var that = this;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.actors = {};
    this.childrenSurface = {};
    this.actorsStarted = false;
    this.fnOnceChildrenSurfaces = Utils.runOnce(function() {
        that.runEntityWithEvent(this.childrenSurface, 'init');
    });
    this.stopped = false;
    this.animationLoop = undefined;
    this.drawFrame = undefined;
};

Game.prototype.start = function(everyFrame) {
    var that = this;
    this.stopped = false;

    if (!this.actorsStarted) {
        this.actorsStarted = true;
        this.runEntityWithEvent(this.actors, 'init');
        this.fnOnceChildrenSurfaces();
        if(typeof this.init === "function") {
            this.init(this);
        }
    }

    this.drawFrame = function() {
        that.animationLoop = window.requestAnimationFrame(that.drawFrame, that.canvas);
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        if(typeof that.everyPreFrame === "function") {
            that.everyPreFrame(that);
        }
        that.runEntityWithEvent(that.actors, 'update');
        that.runEntityWithEvent(that.actors, 'render');
        that.runEntityWithEvent(that.childrenSurface, 'render');
    };
    this.loop(everyFrame);
};

Game.prototype.addActor = function(name, actorSelf) {
    this.actors[name] = actorSelf;
};

Game.prototype.addChildSurface = function(name, instanceSelf) {
    this.childrenSurface[name] = instanceSelf;
};

Game.prototype.runEntityWithEvent = function(entityList, eventName) {
    var that = this;
    Object.keys(entityList).forEach(function(name){
            var entityReference = entityList[name];
            entityReference[eventName](that);
    });
};

Game.prototype.loop = function() {
    if (this.stopped == false) {
        this.drawFrame();
    }
};

Game.prototype.stop = function() {
    this.stopped = true;
    window.cancelAnimationFrame(this.animationLoop);
};

Game.prototype.restart = function() {
    this.stop();
    this.actorsStarted = false;
    this.start();
};

Game.prototype.events = new EventHandler();