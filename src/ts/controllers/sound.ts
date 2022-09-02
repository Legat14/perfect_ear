import * as Tone from 'tone';
import {
  Decibels,
  Frequency,
  BPM,
  Subdivision,
  Seconds,
} from 'tone/build/esm/core/type/Units';
import { Pause } from '../types/note-types';

interface ISound {
  voice?: Partial<Tone.SamplerOptions>;
  volume?: Decibels;
  tactDuration: BPM;

  setVoice: (voice: Partial<Tone.SamplerOptions>) => void;
  setVolume: (volume: Decibels) => void;
  setTactDuration: (tactDuration: BPM) => void;

  playNote: (note: [Frequency, Subdivision]) => void;
  playSequence?: (notes: [Pause | Frequency | Frequency[], Subdivision][]) => void;
  muteNotes?: () => void;
}

class Sound implements ISound {
  public tactDuration: BPM;

  public voice: Partial<Tone.SamplerOptions>;

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
    this.tactDuration = tactDuration;
    this.voice = voice;

    const sampler = new Tone.Sampler(voice).toDestination();
    sampler.volume.value = volume;

    this.sampler = sampler;
  }

  public setVoice(voice: Partial<Tone.SamplerOptions>): void {
    this.sampler = new Tone.Sampler(voice);
  }

  public setVolume(volume: Decibels): void {
    this.sampler.volume.value = volume;
  }

  public setTactDuration(tactDuration: BPM): void {
    this.tactDuration = tactDuration;
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
}

export default Sound;
