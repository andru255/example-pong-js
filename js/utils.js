var Utils = {};
Utils.drawRectangleOn = function(ctx, x, y, width, height, lineWidth, color) {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}