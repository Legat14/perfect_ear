import ScaleIdentification from '../../../controllers/games/scale/scale-identification';
import ScaleIdentificationView from './scale-identification';

const scaleOptions = [
  'scales',
  'scale-identification',
  'Определение ладов',
  ScaleIdentification,
  ScaleIdentificationView,
] as const;

export default scaleOptions;
