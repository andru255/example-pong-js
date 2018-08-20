function PromptResult() {
    this.x = 0;
    this.y = 0;
    this.width = 360;
    this.height = 120;
    this.canvas = null;

    // title text
    this.titleX = 0;
    this.titleY = 0;
    this.titleText = "Thanks for play PPong!";
    this.titleColor = "#000";

    // message text
    this.messageX = 0;
    this.messageY = 0;
    this.messageText = "";
    this.messageColor = "#000";

    // buttons
    // Restart
    this.btnReset = undefined;
    this.btnResetX = 0;
    this.btnResetY = 0;
    this.btnResetTitle = " Play again (r)";
    this.btnResetColor = "#000";

    // states
    this.isHidden = true;
};

PromptResult.prototype.constructor = ChildSurface.prototype.constructor;

PromptResult.prototype.init = function(engine) {
    var that = this;

    this.x = ( engine.canvas.width - this.width ) / 2;
    this.y = ( engine.canvas.height - this.height ) / 2;

    this.titleX = this.x + 5;
    this.titleY = this.y + 30;

    this.messageX = this.x + 140;
    this.messageY = this.y + 60;

    this.btnResetX = this.x + 100;
    this.btnResetY = this.y + 80;

    // btn reset
    this.btnReset = new UI.Button("btnPlayAgain", engine.canvas);
    this.btnReset.setTitle(this.btnResetTitle, 15)
          .setWidth(160)
          .setPosition(this.btnResetX, this.btnResetY)
          .on("click", function(btn) {
              that._onReset.call(that, btn, engine);
          })
          .on("keydown", function(btn, evt){
              // r
              if (82 == evt.keyCode) {
                that._onReset.call(that, btn, engine);
              }
          });

};

PromptResult.prototype.render = function(engine) {
    var ctx = engine.canvas.getContext("2d");
    // starting listen events
    this.listenEvents(engine);
    var needsShow = this.isHidden ? false : true;
    this.btnReset.hide();
    if ( needsShow ) {
        // box
        Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, 10, "#b4d3aa");

        // title
        Utils.drawText(ctx, this.titleX, this.titleY, this.titleText, this.titleColor);

        // message
        Utils.drawText(ctx, this.messageX, this.messageY, this.messageText, this.messageColor, 16);

        engine.stop();
        this.btnReset.render(ctx).show();
    }
};

PromptResult.prototype.listenEvents = function(engine) {
    var that = this;
    var scorePlayer = engine.actors.scorePlayer;
    var scoreEnemy = engine.actors.scoreEnemy;
    if (scorePlayer.score >= 3) {
        this.messageText = "You win! :)";
        this.isHidden = false;
    } else if(scoreEnemy.score >= 3) {
        this.messageText = "You lose! :(";
        this.isHidden = false;
    }
};

PromptResult.prototype._onReset = function(btn, engine) {
    this.isHidden = true;
    engine.restart();
    this.listenEvents(engine);
};