// cancelAnimationFrame
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                   window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                   window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                   window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                   window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                   window.clearTimeout);
}

var Utils = {};

// drawing
Utils.drawRectangleOn = function(ctx, x, y, width, height, lineWidth, color, angle, borderColor) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = borderColor || "rgba(132, 210, 222, 0.5)";
    ctx.fillStyle = color || "#f00";
    ctx.translate(x, y);
    ctx.rotate(angle || 0 * Math.PI / 180);
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};

Utils.drawText = function(ctx, x, y, text, color, size) {
    var fontSize = size || 30;
    var parsedFontSize = fontSize + "px";
    ctx.save();
    ctx.beginPath();
    ctx.font = parsedFontSize + " 'Share Tech Mono', monospace, sans-serif";
    ctx.strokeStyle = color || "#fff";
    ctx.strokeText(text, x, y);
    ctx.stroke();
    ctx.restore();
};

Utils.itContainsAABB = function(a, b) {
    var left = ( a.x + a.width ) < b.x;
    var right = a.x > ( b.x + b.width ); 
    var top = ( a.y + a.height ) < b.y;
    var bottom = a.y > ( b.y + b.height );
    return !(left || right || top || bottom);
};

// Random functions
Utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Utils.getRandomValueFromArray = function(arrayOfValues) {
    return arrayOfValues[Math.floor(Utils.getRandomInt(0, arrayOfValues.length - 1))];
};

// Get the mouse position into the canvas
Utils.getMousePosition = function(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

// Check if an object is inside of other
Utils.isInside = function(position, rect) {
    var l2r = position.x > rect.x;
    var r2l = position.x < rect.x + rect.width;
    var t2b = position.y > rect.y;
    var b2t = position.y < rect.y + rect.height;
    return l2r && r2l && t2b && b2t;
};

// source: https://davidwalsh.name/javascript-once
Utils.runOnce = function(fnSelf, context) {
    var result;
    return function() {
        if (fnSelf) {
            fnSelf.apply(context || this, arguments);
            fnSelf = null;
        }
        return result;
    };
};

// Timer utilities
Utils.TimerHandler = function() {
    this.interval = undefined;
};
Utils.TimerHandler.prototype.every = function(time, cb) {
    var that = this;
    if (typeof this.interval === "undefined") {
        this.interval = setInterval(function () {
            cb.call(this, that);
        }, time);
    }
};
Utils.TimerHandler.prototype.clear = function() {
    clearInterval(this.interval);
    this.interval = undefined;
};

// Color utilities
Utils.parseColor = function(color, toNumber){
    var result = "fff";
    if(toNumber){
        if(typeof color === "number"){
            return (color | 0);
        }
        if(typeof color === "string" && color[0] === "#"){
            color = color.slice(1);
        }
        result = window.parseInt(color, 16);
    } else {
        if(typeof color === "number"){
            color = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
        }
        result = color;
    }
    return result;
};
/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
Utils.colorToRGB = function (color, alpha) {
    //number in octal format or string prefixed with #
    if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
    }
    alpha = (alpha === undefined) ? 1 : alpha;
    //parse hex values
    var r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & 0xff,
        a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
    //only use 'rgba' if needed
    if (a === 1) {
        return "rgb("+ r +","+ g +","+ b +")";
    } else {
        return "rgba("+ r +","+ g +","+ b +","+ a +")";
    }
};