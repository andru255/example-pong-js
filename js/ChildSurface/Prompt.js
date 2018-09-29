function Prompt() {
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
    // Restart
    this.btnReset = undefined;
    this.btnResetX = 0;
    this.btnResetY = 0;
    this.btnResetTitle = "Reset! (r)";
    this.btnResetColor = "#000";

    // Resume / start
    this.btnResume = undefined;
    this.btnResumeX = 0;
    this.btnResumeY = 0;
    this.btnResumeTitle = "Resume (ESC/ENTER)";
    this.btnResumeColor = "#0ff";

    // states
    this.isHidden = true;
}

Prompt.prototype.constructor = ChildSurface.prototype.constructor;

Prompt.prototype.init = function(engine) {
    var that = this;

    this.x = ( engine.canvas.width - this.width ) / 2;
    this.y = ( engine.canvas.height - this.height ) / 2;

    this.titleX = this.x + 50;
    this.titleY = this.y + 30;

    this.messageX = this.x + 10;
    this.messageY = this.y + 60;

    this.btnResetX = this.x + 50;
    this.btnResetY = this.y + 80;

    this.btnResumeX = this.x + 160;
    this.btnResumeY = this.y + 80;

    // btn reset
    this.btnReset = new UI.Button("btnReset", engine.canvas);
    this.btnReset.setTitle(this.btnResetTitle, 15)
          .setWidth(100)
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

    // btn resume
    this.btnResume = new UI.Button("btnResume", engine.canvas);
    this.btnResume.setTitle(this.btnResumeTitle)
          .setWidth(160)
          .setPosition(this.btnResumeX, this.btnResumeY)
          .on("click", function(btn){
              that._onResume.call(that, btn, engine);
          })
          .on("keydown", function(btn, evt){
              // ESC or Intro
              if (27 == evt.keyCode || 13 == evt.keyCode) {
                that._onResume.call(that, btn, engine);
              }
          });
    
    // starting listen events
    this.listenEvents(engine);
};

Prompt.prototype.render = function(engine) {
    var ctx = engine.canvas.getContext("2d");
    var needsShow = this.isHidden ? false : true;
    this.btnReset.hide();
    this.btnResume.hide();


    if ( needsShow ) {
        // box
        Utils.drawRectangleOn(ctx, this.x, this.y, this.width, this.height, 10, "#b4d3aa");

        // title
        Utils.drawText(ctx, this.titleX, this.titleY, this.titleText, this.titleColor);

        // message
        Utils.drawText(ctx, this.messageX, this.messageY, this.messageText, this.messageColor, 16);

        engine.stop();
        engine.events.off(document, "keydown.showPrompt");
        this.btnReset.render(ctx).show();
        this.btnResume.render(ctx).show();
    }
};

Prompt.prototype.listenEvents = function(engine) {
    var that = this;
    // checks if welcome prompt still show in
    // listen ESC key
    engine.events.on(document, "keydown.showPrompt", function(evt){
        var welcomePromptIsHidden = engine.childrenSurface.promptWelcome.isHidden;
        var resultPromptIsHidden = engine.childrenSurface.promptResult.isHidden;
        if (!welcomePromptIsHidden || !resultPromptIsHidden) {
            return false;
        }
        // ESC
        if (27 == evt.keyCode) {
            if (that.isHidden) {
                that.isHidden = false;
            } else {
                that._onResume(undefined, engine);
            }
        }
    });
};

Prompt.prototype._onReset = function(btn, engine) {
    this.isHidden = true;
    engine.restart();
    this.listenEvents(engine);
};

Prompt.prototype._onResume = function(btn, engine) {
    this.isHidden = true;
    engine.start();
    this.listenEvents(engine);
};