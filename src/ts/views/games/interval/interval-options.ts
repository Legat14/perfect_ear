import IntervalComparison from '../../../controllers/games/interval/interval-comparison';
import IntervalComparisonView from './interval-comparison';

const intervalOptions = [
  'intervals',
  'interval-comparison',
  'Сравнение интервалов',
  IntervalComparison,
  IntervalComparisonView,
] as const;

export default intervalOptions;
