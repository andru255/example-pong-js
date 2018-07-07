var Utils = {};
Utils.drawRectangleOn = function(ctx, x, y, width, height, lineWidth, color, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(angle || 0 * Math.PI / 180);
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};

Utils.itContainsAABB = function(a, b) {
    var left = a.x + a.width < b.x;
    var right = a.x > b.x + b.width; 
    var top = a.y + a.height < b.y;
    var bottom = a.y > b.y + b.height;
    return !(left || right || top || bottom);
};