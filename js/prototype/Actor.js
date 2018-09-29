function Actor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = "#ff00ff";
}
Actor.prototype.init = function(gameFeatures) {};
Actor.prototype.update = function(gameFeatures) {};
Actor.prototype.render = function(gameFeatures) {};