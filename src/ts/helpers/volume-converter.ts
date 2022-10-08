import { Decibels } from 'tone/build/esm/core/type/Units';

class VolumeConverter {
  static toDecibels(value: number | string): Decibels {
    return 20 * Math.log10(Number(value) / 100);
  }

  static fromDecibels(value: Decibels): number {
    return Math.round(10 ** (value / 20) * 100);
  }
}

export default VolumeConverter;
