function ParticleEmitter() {
    this.total = 20;
    this.particles = [];
};

ParticleEmitter.prototype.constructor = ChildSurface.prototype.constructor;

ParticleEmitter.prototype.init = function(engine) {

};

ParticleEmitter.prototype.generate = function(x, y, angle, direction) {
    var total = this.total;
    while(total--){
        this.particles.push(new Particle({
                    x: x,
                    y: y,
                    angle: angle,
                    direction: direction
        }));
    }
};

ParticleEmitter.prototype.render = function(engine) {
    var that = this;
    this.particles.forEach(function(particle, index) {
        var bounds = {width: engine.canvas.width, height: engine.canvas.height, x: 0, y:0};
        if (!Utils.itContainsAABB(particle.shape, bounds) || particle.needsToRemove) {
            that.particles.splice(index, 1);
        }
        particle.render(engine);
    });
};