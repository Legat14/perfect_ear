import Emitter from '../../helpers/emitter';
import UserConfig from '../../models/user-config';
import { Languages } from '../../types/data-types';

const [
  LangEmitter,
  VolumeEmitter,
  TempoEmitter,
  SettingsEmitter,
] = [
  new Emitter<keyof typeof Languages>(),
  new Emitter<number>(),
  new Emitter<number>(),
  new Emitter<UserConfig>(),
];

export {
  LangEmitter,
  VolumeEmitter,
  TempoEmitter,
  SettingsEmitter,
};

// TODO: Rename this file to emitters
