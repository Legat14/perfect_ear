import * as Tone from 'tone';
import {
  Decibels,
  Frequency,
  BPM,
  Subdivision,
  Seconds,
  Note,
  TimeObject,
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

  private part!: Tone.Part<[Seconds, [Frequency | Frequency[], Subdivision | TimeObject]]>;

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

  /**
   * @example
   * Sound.playSequence([
   *   ['C2', '4n'],
   *   ['C3', '8n'],
   *   ['C3', '16n'],
   *   ['D2', '16n'],
   *   ['E2', '4n'],
   *   ['D2', '8n'],
   *   ['A1', '8n'],
   * ])
   */
  public playSequence(
    notes: [Pause | Frequency | Frequency[], Subdivision | TimeObject][],
  ): Promise<void> {
    if (this.part) this.stopSequence();

    return Tone.loaded().then(() => {
      this.sampler.toDestination();

      this.part = new Tone.Part<
      [Seconds, [Pause | Frequency | Frequency[], Subdivision | TimeObject]]
      >(
        (
          time,
          [freq, sub]: [
            Pause | Frequency | Frequency[],
            Subdivision | TimeObject,
          ],
        ): void => {
          if (freq !== 'pause') this.sampler.triggerAttackRelease(freq, sub);
        },
        notes.reduce<{
          res: [
            Seconds,
            [Pause | Frequency | Frequency[], Subdivision | TimeObject],
          ][];
          time: Seconds;
        }>(
          (acc, [freq, sub]) => ({
            res: [[acc.time, [freq, sub]], ...acc.res],
            time: acc.time + Tone.Time(sub).toSeconds(),
          }),
          { res: [], time: 0 },
        ).res,
      );
      this.part.start(0);
      Tone.Transport.start();
    });
  }

  public stopSequence() {
    if (this.part) this.part.stop();
    Tone.Transport.stop();
  }

  public attackNote(note: Note) {
    this.sampler.triggerAttack(note);
  }

  public releaseNote(note: Note) {
    this.sampler.triggerRelease(note);
  }
}

export default Sound;
