// Handlers
function ActorsHandler() {
    Handler.apply(this, arguments);
}
ActorsHandler.prototype = Object.create(Handler.prototype);
ActorsHandler.prototype.constructor = Handler;

function ChildrenSurfaceHandler() {
    Handler.apply(this, arguments);
}
ChildrenSurfaceHandler.prototype = Object.create(Handler.prototype);
ChildrenSurfaceHandler.prototype.constructor = Handler;

function Game(canvasId) {
    Engine.call(this, arguments);
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    // defining handlers
    this.actorsHandler = new ActorsHandler();
    this.childrenSurfaceHandler = new ChildrenSurfaceHandler();
    this.disabledSound = true;
}
Game.prototype = Object.create(Engine.prototype);
Game.prototype.constructor = Engine;

// Override getFeatures method
// Main method to share data or methods between entities
Game.prototype.getFeatures = function() {
    var that = this;
    return {
        canvas: this.canvas,
        actors: function() {
            return that.actorsHandler.getAll();
        }(),
        ctx: this.ctx,
        childrenSurface: this.childrenSurfaceHandler.getAll(),
        events: function() {
            return that.events;
        }(),
        start: function() {
            that.start();
        },
        stop: function() {
            that.stop();
        },
        restart: function() {
            that.restart();
        },
        actorsStarted: function() {
            return this.actorsHandler.state.start;
        },
        sound: this.getSound()
    };
};