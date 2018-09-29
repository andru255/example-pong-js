// Abstract class
function Engine() {
    this.stopped = false;
    this.animationLoop = undefined;
    this.drawFrame = undefined;
    this.disabledSound = undefined;
    // handlers to define
    this.childrenSurfaceHandler = undefined;
    this.actorsHandler = undefined;
}

Engine.prototype.getFeatures = function() {
    throw "Needs define getFeatures() method";
};

Engine.prototype.start = function(everyFrame) {
    var that = this;
    this.stopped = false;

    this.actorsHandler.startOnce(function() {
        that.childrenSurfaceHandler.startOnce(undefined, that.getFeatures());
        that.applyFnIfExists(that.init);
    }, that.getFeatures());

    this.drawFrame = function() {
        that.animationLoop = window.requestAnimationFrame(that.drawFrame, that.canvas);
        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.applyFnIfExists(that.everyPreFrame);
        that.actorsHandler.updateAll(that.getFeatures());
        that.actorsHandler.renderAll(that.getFeatures());
        that.childrenSurfaceHandler.renderAll(that.getFeatures());
    };
    this.loop(everyFrame);
};

Engine.prototype.addActor = function(name, actorSelf) {
    this.actorsHandler.add(name, actorSelf);
};

Engine.prototype.addChildSurface = function(name, instanceSelf) {
    this.childrenSurfaceHandler.add(name, instanceSelf);
};

Engine.prototype.applyFnIfExists = function(posibleFunction) {
    if (typeof posibleFunction == "function") {
        posibleFunction.call(undefined, this.getFeatures());
    }
};

Engine.prototype.loop = function() {
    if (this.stopped == false) {
        this.drawFrame();
    }
};

Engine.prototype.stop = function() {
    this.stopped = true;
    window.cancelAnimationFrame(this.animationLoop);
};

Engine.prototype.restart = function() {
    this.stop();
    this.actorsHandler.stop();
    this.start();
};

Engine.prototype.getSound = function() {
    return new Sound(this.disabledSound);
};

Engine.prototype.events = new EventHandler();