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
Utils.drawRectangleOn = function(ctx, x, y, width, height, lineWidth, color, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "rgba(132, 210, 222, 0.5)";
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

Utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Utils.getRandomValueFromArray = function(arrayOfValues) {
    return arrayOfValues[Math.floor(Utils.getRandomInt(0, arrayOfValues.length - 1))];
};

Utils.getMousePosition = function(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

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