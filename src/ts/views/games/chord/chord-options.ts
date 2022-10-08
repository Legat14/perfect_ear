import ChordIdentification from '../../../controllers/games/chord/chord-identification';
import ChordIdentificationView from './chord-identification';

const chordOptions = [
  'chords',
  'chord-identification',
  {
    RUS: 'Определение аккордов',
    ENG: 'Chord Identification',
  },
  ChordIdentification,
  ChordIdentificationView,
] as const;

export default chordOptions;
