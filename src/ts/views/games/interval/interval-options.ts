import IntervalComparison from '../../../controllers/games/interval/interval-comparison';
import IntervalComparisonView from './interval-comparison';

const intervalOptions = [
  'intervals',
  'interval-comparison',
  {
    RUS: 'Сравнение интервалов',
    ENG: 'Interval Comparison',
  },
  IntervalComparison,
  IntervalComparisonView,
] as const;

export default intervalOptions;
