var Utils = {};

// drawing
Utils.drawRectangleOn = function(ctx, x, y, width, height, lineWidth, color, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = color || "#f00";
    ctx.translate(x, y);
    ctx.rotate(angle || 0 * Math.PI / 180);
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};

Utils.drawText = function(ctx, x, y, text, color) {
    ctx.save();
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.strokeStyle = color || "#fff";
    ctx.strokeText(text, x, y);
    ctx.stroke();
    ctx.restore();
};

Utils.itContainsAABB = function(a, b) {
    var left = a.x + a.width < b.x;
    var right = a.x > b.x + b.width; 
    var top = a.y + a.height < b.y;
    var bottom = a.y > b.y + b.height;
    return !(left || right || top || bottom);
};

Utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
