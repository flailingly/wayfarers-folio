// Web Audio API Synthesized 8-Bit Chimes
class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(type = 'find') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t0 = this.ctx.currentTime;
      const notes = {
        find: [587, 880],
        clock: [523, 659, 784],
        claim: [440, 554, 659, 880],
        level: [392, 523, 659, 784, 1047]
      }[type] || [660];

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = t0 + idx * 0.08;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.04, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.14);
      });
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }
}

export const sound = new SoundController();
