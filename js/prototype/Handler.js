function Handler() {
    this.state = {
        "started": false
    };
    this.entities = {};
}

Handler.prototype.setState = function(key, value) {
    this.state[key] = value;
};

Handler.prototype.add = function(name, actorSelf) {
    this.entities[name] = actorSelf;
};

Handler.prototype.getAll = function() {
    return this.entities;
};

Handler.prototype.startOnce = function(callback, instance) {
    var _callback = callback || function() {};
    if (this.state.started == false) {
        this.setState("started", true);
        this.runEntitiesWithMethod("init", instance);
        _callback.call(this, this.entities);
    }
};

Handler.prototype.stop = function(){
    this.setState("started", false);
};

Handler.prototype.updateAll = function(instance) {
    this.runEntitiesWithMethod("update", instance);
};

Handler.prototype.renderAll = function(instance) {
    this.runEntitiesWithMethod("render", instance);
};

Handler.prototype.runEntitiesWithMethod = function(methodName, instance){
    var entityList = this.entities;
    Object.keys(entityList).forEach(function(name){
        var entityReference = entityList[name];
        entityReference[methodName](instance);
    });
};