/**
 * Example:
 * 
 * var handler = new EventHandler();
 * handler.on(document, "click.demo", function(evt){
 *     console.log("my event demo yay!", evt);
 * });
 * 
 * handler.on(document, "click.clouse", function(evt) {
 *     console.log("clouse!", evt);
 * });
 * 
 * // removing
 * handler.off(document, "click.demo");
 */
var EventHandler = function() {
    this.events = {};
    this.pattern = /([a-z]+)\.?(.*)?/;
};

EventHandler.prototype.on = function(target, name, eventSelf) {
    var match = name.match(this.pattern);
    if ( typeof match !== "undefined" ) {
        this.events[name] = function(evt) {
            eventSelf.call(this, evt);
        };
        var eventName = match[1];
        target.addEventListener(eventName, this.events[name], false);
    }
    return this;
};

EventHandler.prototype.off = function(target, name) {
    var eventSelf = this.events[name];
    var match = name.match(this.pattern);
    if ((typeof eventSelf !== "undefined") && (typeof match !== "undefined")) {
        var eventName = match[1];
        target.removeEventListener(eventName, eventSelf, false);
    }
    return this;
};

EventHandler.prototype.once = function(target, name, eventSelf) {
    var that = this;
    var match = name.match(this.pattern);
    if ( typeof match !== "undefined" ) {
        this.events[name] = function(evt) {
            eventSelf.call(this, evt);
            that.off(target, name);
        };
        var eventName = match[1];
        target.addEventListener(eventName, this.events[name], false);
    }
};