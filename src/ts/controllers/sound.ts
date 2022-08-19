import * as Tone from 'tone';
import {
  Decibels,
  Frequency,
  BPM,
  Subdivision,
  Seconds,
} from 'tone/build/esm/core/type/Units';
import { Pause } from '../types/pause';

interface ISound {
  voice?: Partial<Tone.SamplerOptions>;
  volume?: Decibels;
  tactDuration: BPM;

  setVoice: (voice: Partial<Tone.SamplerOptions>) => void;
  setVolume: (volume: Decibels) => void;
  setTactDuration: (tactDuration: BPM) => void;

  playNote: (note: [Frequency, Subdivision]) => void;
  playSequence?: (notes: [Pause | Frequency | Frequency[], Subdivision][]) => void;
  muteNotes?: (notes: Frequency[] | Frequency) => void;
}

class Sound implements ISound {
  public tactDuration: BPM;

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

    const sampler = new Tone.Sampler(voice);
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
    this.sampler.triggerAttackRelease(...note).toDestination();
  }

  public playSequence(notes: [Pause | Frequency | Frequency[], Subdivision][]): void {
    Tone.Transport.bpm.value = this.tactDuration;

    notes.reduce(
      (
        time: Seconds,
        [freq, sub]: [Pause | Frequency | Frequency[], Subdivision],
      ) => {
        this.sampler
          .triggerAttackRelease(freq === 'pause' ? sub : freq, sub, time)
          .toDestination();
        return time + Tone.Time(sub).toSeconds();
      },
      Tone.now(),
    );

    Tone.Transport.start();
  }
}

export default Sound;
