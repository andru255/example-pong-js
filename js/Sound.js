function Sound(disable) {
    this.disable = disable || false;
}

Sound.prototype.boundResistance = function() {
    this._setup(function(stop, currentTime){
        this.oscillator.frequency.value = 46.25; //F#
        this.gainNode.gain.setValueAtTime(0, currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.001);
        this.oscillator.start(currentTime);
        stop();
    });
};

Sound.prototype.ballOut = function() {
    this._setup(function(stop, currentTime){
        this.oscillator.frequency.setValueAtTime(466.16, currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.001);
        this.oscillator.start();
        stop();
    });
};

Sound.prototype.paddleResistance = function() {
    this._setup(function(stop, currentTime){
        this.oscillator.frequency.value = 311.13; //D#
        this.gainNode.gain.setValueAtTime(0, currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.01);
        this.oscillator.start(currentTime);
        stop();
    });
};

Sound.prototype._setup = function(callback) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'square';
        var currentTime = this.context.currentTime;
        var that = this;
        var stop = function() {
            return that._stop(currentTime);
        };
        if (this.disable) {
            return;
        }
        callback.call(this, stop, currentTime);
};

Sound.prototype._stop = function(currentTime) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 1);
    this.oscillator.stop(currentTime + 1);
};