/**
 * panel background:
 *  #b4d3aa
 * panel border:
 *  #84d2de
 * button normal bgcolor:
 *  #ea8f3c
 *  " " hover:
 *  #b24629
 *  " " pressed:
 *  
 */
var UI = {};

UI.Button = function(id, canvas) {
    this.canvas = canvas;
    this.id = id || "defaultBtn";
    this.title = "Button";
    this.x = 0;
    this.y = 0;
    this.width = 120;
    this.height = 30;
    this.normalBgColor = "#ea8f3c";
    this.bgColor = this.normalBgColor;
    this.bgColorPressed = "#b24629";
    this.tint = "#fff";
    this.fontSize = 15;
    this.callbacks = {};
    this.isHidden = false;
    this.eventHandler = new EventHandler();
    this.hided = false;
    this.showed = false;
};

UI.Button.prototype.setTitle = function(value, fontSize) {
    this.title = value;
    this.fontSize = fontSize || this.fontSize;
    return this;
};

UI.Button.prototype.setBgColor = function(value) {
    this.bgColor = value;
    return this;
};

UI.Button.prototype.setTint = function(value) {
    this.tint = value;
    return this;
};

UI.Button.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};

UI.Button.prototype.setWidth = function(value) {
    this.width = value;
    return this;
};

UI.Button.prototype.hide = function() {
    if (!this.hided) {
        this.hided = true;
        this.isHidden = true;
        this.showed = false;
        this.unlistenEvents();
    }
    return this;
};

UI.Button.prototype.show = function() {
    if (!this.showed) {
        this.showed = true;
        this.isHidden = false;
        this.hided = false;
        this.listenEvents(this.canvas);
    }
    return this;
};

UI.Button.prototype.render = function(ctx) {
    Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, 2, this.bgColor);
    Utils.drawText(ctx, this.x + 10, this.y + 20, this.title, this.tint, this.fontSize);
    return this;
};

UI.Button.prototype.getRect = function() {
    return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
};

UI.Button.prototype.listenEvents = function(canvas) {
    var that = this;
    var _mouseDownEvent = function(evt) {
        var mousePosition = Utils.getMousePosition(canvas, evt);
        if (Utils.isInside(mousePosition, that.getRect())) {
            that._pressed(canvas.getContext("2d"));
        }
    };
    var _mouseUpEvent = function(evt) {
        that._unpressed(canvas.getContext("2d"));
    };
    var _clickEvent = function(evt) {
        var mousePosition = Utils.getMousePosition(canvas, evt);
        if (Utils.isInside(mousePosition, that.getRect())) {
            that._checkCallback("click");
            that._unpressed(canvas.getContext("2d"));
        } 
    };
    var _mouseMoveEvent = function(evt) {
        var mousePosition = Utils.getMousePosition(canvas, evt);
        if (Utils.isInside(mousePosition, that.getRect())) {
            that._checkCallback("mouseinside");
        }
    };
    var _keyDownEvent = function(evt) {
        that._checkCallback("keydown", evt);
        that._unpressed(canvas.getContext("2d"));
    };

    this.eventHandler.on(document, "mousedown." + this.id, _mouseDownEvent)
            .on(document, "mouseup." + this.id, _mouseUpEvent)
            .on(document, "click." + this.id, _clickEvent)
            .on(document, "mousemove." + this.id, _mouseMoveEvent)
            .on(document, "keydown." + this.id, _keyDownEvent);
};

UI.Button.prototype.unlistenEvents = function() {
    this.eventHandler.off(document, "mousedown." + this.id)
      .off(document, "mouseup." + this.id)
      .off(document, "click." + this.id)
      .off(document, "mousemove." + this.id)
      .off(document, "keydown." + this.id);
};

UI.Button.prototype.on = function(callbackName, callbackSelf) {
    this.callbacks[callbackName] = callbackSelf;
    return this;
};

UI.Button.prototype._checkCallback = function(callbackName, params) {
    var callback = this.callbacks[callbackName] || false;
    if ( callback ) {
        this.callbacks[callbackName].call(undefined, this, params);
    }
};

UI.Button.prototype._pressed = function(ctx) {
    this.setBgColor(this.bgColorPressed).render(ctx);
};

UI.Button.prototype._unpressed = function(ctx) {
    this.setBgColor(this.normalBgColor).render(ctx);
};