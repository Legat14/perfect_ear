import intervalRus from '../views/theory/interval/interval.html';
import gammaRus from '../views/theory/gamma/gamma.html';
import accordsRus from '../views/theory/accords/accords.html';
import ladRus from '../views/theory/lad/lad.html';
import rhythmRus from '../views/theory/rhythm/rhythm.html';
import intervalEng from '../views/theory/interval-en/interval-en.html';
import gammaEng from '../views/theory/gamma-en/gamma-en.html';
import accordsEng from '../views/theory/accords-en/accords-en.html';
import ladEng from '../views/theory/lad-en/lad-en.html';
import rhythmEng from '../views/theory/rhythm-en/rhythm-en.html';
import { Languages } from './data-types';

const [
  interval,
  gamma,
  accords,
  lad,
  rhythm,
] = [
  {
    RUS: intervalRus,
    ENG: intervalEng,
  },
  {
    RUS: gammaRus,
    ENG: gammaEng,
  },
  {
    RUS: accordsRus,
    ENG: accordsEng,
  },
  {
    RUS: ladRus,
    ENG: ladEng,
  },
  {
    RUS: rhythmRus,
    ENG: rhythmEng,
  },
] as Record<keyof typeof Languages, string>[];

export {
  interval,
  gamma,
  accords,
  lad,
  rhythm,
};
