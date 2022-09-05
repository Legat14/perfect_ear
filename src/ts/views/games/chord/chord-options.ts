import ChordIdentification from '../../../controllers/games/chord/chord-identification';
import ChordIdentificationView from './chord-identification';

const chordOptions = [
  'chords',
  'chord-identification',
  'Определение аккордов',
  ChordIdentification,
  ChordIdentificationView,
] as const;

export default chordOptions;
