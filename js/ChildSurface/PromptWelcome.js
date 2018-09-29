function PromptWelcome() {
    this.x = 0;
    this.y = 0;
    this.width = 350;
    this.height = 120;
    this.canvas = null;

    // title text
    this.titleX = 0;
    this.titleY = 0;
    this.titleText = "Welcome to PPong";
    this.titleColor = "#000";

    // message text
    this.messageX = 0;
    this.messageY = 0;
    this.messageText = "Press the keys up/down and be cool :)";
    this.messageColor = "#000";

    // buttons
    // Start!
    this.btnStart = undefined;
    this.btnStartX = 0;
    this.btnStartY = 0;
    this.btnStartTitle = " Play (ENTER)";
    this.btnStartColor = "#000";

    // states
    this.isHidden = false;
}

PromptWelcome.prototype.constructor = ChildSurface.prototype.constructor;

PromptWelcome.prototype.init = function(engine) {
    var that = this;

    this.x = ( engine.canvas.width - this.width ) / 2;
    this.y = ( engine.canvas.height - this.height ) / 2;

    this.titleX = this.x + 50;
    this.titleY = this.y + 30;

    this.messageX = this.x + 10;
    this.messageY = this.y + 60;

    this.btnStartX = this.x + 100;
    this.btnStartY = this.y + 80;

    // btn start
    this.btnStart = new UI.Button("btnPlay", engine.canvas);
    this.btnStart.setTitle(this.btnStartTitle, 15)
          .setWidth(135)
          .setPosition(this.btnStartX, this.btnStartY)
          .on("click", function(btn) {
              that._onStart.call(that, btn, engine);
          })
          .on("keydown", function(btn, evt){
              // intro
              if (13 == evt.keyCode) {
                that._onStart.call(that, btn, engine);
              }
          });
};

PromptWelcome.prototype.render = function(engine) {
    var ctx = engine.canvas.getContext("2d");
    // starting listen events
    this.listenEvents(engine);
    var needsShow = this.isHidden ? false : true;
    this.btnStart.hide();
    if ( needsShow ) {
        // box
        Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, 10, "#b4d3aa");

        // title
        Utils.drawText(ctx, this.titleX, this.titleY, this.titleText, this.titleColor);

        // message
        Utils.drawText(ctx, this.messageX, this.messageY, this.messageText, this.messageColor, 16);

        engine.stop();
        this.btnStart.render(ctx).show();
    }
};

PromptWelcome.prototype.listenEvents = function(engine) {
    if (!engine.actorsStarted) {
        this.isHidden = false;
    }
};

PromptWelcome.prototype._onStart = function(btn, engine) {
    this.isHidden = true;
    engine.restart();
    this.listenEvents(engine);
};