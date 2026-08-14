// Web Audio API Procedural Audio Generator for PRAVAAH'27 KAIROS
let audioCtx = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let masterGain = null;
let isPlaying = false;

export const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
};

export const toggleAmbientSound = (enable) => {
  initAudio();
  if (!audioCtx) return false;

  if (audioCtx.state === 'suspended' && enable) {
    audioCtx.resume();
  }

  if (enable && !isPlaying) {
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);

    // Deep cosmic drone oscillator (55Hz A1)
    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Subtle Fifth Harmonic (82.4Hz E2)
    ambientOsc2 = audioCtx.createOscillator();
    ambientOsc2.type = 'triangle';
    ambientOsc2.frequency.setValueAtTime(82.4, audioCtx.currentTime);

    // Filter for space warmth
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, audioCtx.currentTime);

    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
    isPlaying = true;
    return true;
  } else if (!enable && isPlaying) {
    if (masterGain) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (ambientOsc1) ambientOsc1.stop();
        if (ambientOsc2) ambientOsc2.stop();
        isPlaying = false;
      }, 1000);
    }
    return false;
  }
  return isPlaying;
};

export const toggleSpaceAudio = () => {
  return toggleAmbientSound(!isPlaying);
};

export const isAudioPlaying = () => {
  return isPlaying;
};

// Play warp jump sound effect on landing transition or section jumps
export const playWarpSound = () => {
  initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.6);
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 1.2);

  gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
};
