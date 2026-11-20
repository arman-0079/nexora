class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainPeak = 0.05,
    delay = 0,
    endFreq?: number,
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainPeak, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playShuffle() {
    const offsets = [0, 0.055, 0.11, 0.165, 0.22];
    offsets.forEach((delay, idx) => {
      this.playTone(170 + idx * 18, 0.045, 'triangle', 0.03, delay, 120);
    });
  }

  public playDraw() {
    this.playTone(240, 0.14, 'sine', 0.045, 0, 420);
  }

  public playFlip() {
    this.playTone(360, 0.08, 'triangle', 0.035, 0, 520);
  }

  public playPlace() {
    this.playTone(190, 0.09, 'triangle', 0.055, 0, 110);
    this.playTone(440, 0.16, 'sine', 0.035, 0.03, 440);
  }

  public playVictory(isDraw: boolean) {
    if (isDraw) {
      this.playTone(330, 0.22, 'sine', 0.045, 0);
      this.playTone(330, 0.28, 'sine', 0.04, 0.16);
      return;
    }
    this.playTone(330, 0.18, 'sine', 0.045, 0);
    this.playTone(440, 0.2, 'sine', 0.045, 0.1);
    this.playTone(554.37, 0.34, 'sine', 0.05, 0.2);
  }
}

export const soundEngine = new SoundEngine();
