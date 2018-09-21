function Sound() {
}

Sound.prototype.boundResistance = function() {
    this._setup();
    this.oscillator.frequency.value = 46.25; //F#
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.001);
    this.oscillator.start(this.context.currentTime);
    this._stop();
};

Sound.prototype.ballOut = function() {
    this._setup();
    var now = this.context.currentTime;
    this.oscillator.frequency.setValueAtTime(466.16, now);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.001);
    this.oscillator.start();
    this._stop();
};

Sound.prototype.paddleResistance = function() {
    this._setup();
    this.oscillator.frequency.value = 311.13; //D#
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);
    this.oscillator.start(this.context.currentTime);
    this._stop();
};

Sound.prototype._setup = function() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'square';
};

Sound.prototype._stop = function() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
    this.oscillator.stop(this.context.currentTime + 1);
};
