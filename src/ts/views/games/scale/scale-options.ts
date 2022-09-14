import ScaleIdentification from '../../../controllers/games/scale/scale-identification';
import ScaleIdentificationView from './scale-identification';

const scaleOptions = [
  'scales',
  'scale-identification',
  {
    RUS: 'Определение ладов',
    ENG: 'Scale Identification',
  },
  ScaleIdentification,
  ScaleIdentificationView,
] as const;

export default scaleOptions;
