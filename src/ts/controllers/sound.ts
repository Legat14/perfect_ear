import * as Tone from 'tone';
import {
  Decibels,
  Frequency,
  BPM,
  Subdivision,
  Seconds,
  Note,
} from 'tone/build/esm/core/type/Units';
import { Pause } from '../types/note-types';

interface ISound {
  voice: Partial<Tone.SamplerOptions>;
  volume: Decibels;
  tactDuration: BPM;

  setVoice?: (voice: Partial<Tone.SamplerOptions>) => void;
  setVolume?: (volume: Decibels) => void;
  setTactDuration?: (tactDuration: BPM) => void;

  playNote: (note: [Frequency, Subdivision]) => void;
  playSequence: (notes: [Pause | Frequency | Frequency[], Subdivision][]) => void;
  muteNotes?: () => void;
}

class Sound implements ISound {
  public sampler: Tone.Sampler;

  constructor({
    voice,
    volume,
    tactDuration,
  }: {
    voice: Partial<Tone.SamplerOptions>;
    volume: Decibels;
    tactDuration: BPM;
  }) {
    const sampler = new Tone.Sampler(voice).toDestination();

    this.sampler = sampler;
    this.volume = volume;
    this.tactDuration = tactDuration;
  }

  public set voice(voice: Partial<Tone.SamplerOptions>) {
    this.sampler = new Tone.Sampler(voice).toDestination();
  }

  public get volume(): Decibels {
    return this.sampler.volume.value;
  }

  public set volume(volume: Decibels) {
    this.sampler.volume.value = volume;
  }

  public get tactDuration(): BPM {
    return Tone.Transport.bpm.value;
  }

  public set tactDuration(tactDuration: BPM) {
    Tone.Transport.bpm.value = tactDuration;
  }

  public mute(): void {
    const volume = new Tone.Volume(0).toDestination();
    this.sampler.disconnect().connect(volume);

    volume.mute = true;
  }

  public unmute(): Tone.Sampler {
    return this.sampler.disconnect().toDestination();
  }

  public playNote(note: [Frequency, Subdivision]): void {
    this.sampler.triggerAttackRelease(...note);
  }

  public playSequence(notes: [Pause | Frequency | Frequency[], Subdivision][]): Promise<number> {
    Tone.Transport.bpm.value = this.tactDuration;
    /**
     * @todo Add preloader
     */
    return Tone.loaded()
      .then(() => notes.reduce(
        (
          time: Seconds,
          [freq, sub]: [Pause | Frequency | Frequency[], Subdivision],
        ) => {
          /**
           * this.sampler.triggerAttack(freq === 'pause' ? sub : freq, time);
           * this.sampler.triggerRelease(freq === 'pause'
           *   ? sub : freq, time + Tone.Time(sub).toSeconds());
           */
          this.sampler.triggerAttackRelease(freq === 'pause' ? sub : freq, sub, time);
          return time + Tone.Time(sub).toSeconds();
        },
        Tone.now(),
      ) - Tone.now());
  }

  /**
   * @todo Add muteNotes();
   */
  public attackNote(note: Note) {
    this.sampler.triggerAttack(note);
  }

  public releaseNote(note: Note) {
    this.sampler.triggerRelease(note);
  }
}

export default Sound;
