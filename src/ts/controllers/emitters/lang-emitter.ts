import Emitter from '../../helpers/emitter';
import { Languages } from '../../types/data-types';

const [
  LangEmitter,
  VolumeEmitter,
  TempoEmitter,
  DayGoalsEmitter,
] = [
  new Emitter<keyof typeof Languages>(),
  new Emitter<number>(),
  new Emitter<number>(),
  new Emitter<number>(),
];

export {
  LangEmitter,
  VolumeEmitter,
  TempoEmitter,
  DayGoalsEmitter,
};
