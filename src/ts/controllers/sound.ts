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

  /**
   * @example
   * this.playSequence([
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
    /**
     * @todo Add preloader
     */

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
