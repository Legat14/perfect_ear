import { Languages } from '../types/data-types';

const LangPack = {
  RUS: {
    0: 'Сменить язык',
    1: 'Русский',
    2: 'Сохранить',
    3: 'Выберите язык',
    4: 'Установите громкость',
    5: 'Сменить громкость',
    6: 'Настройки',
    7: 'Дневные цели',
    8: 'Упражнений в день',
    9: 'Очков в день',
    10: 'Минут в день',
    11: 'Общие настроки',
    12: 'Сбросить статистику',
  },
  ENG: {
    0: 'Language',
    1: 'English',
    2: 'Save',
    3: 'Choose language',
    4: 'Set volume',
    5: 'Adjust volume',
    6: 'Settings',
    7: 'Daily Goals',
    8: 'Exercises a day',
    9: 'Points a day',
    10: 'Minutes a day',
    11: 'Common settings',
    12: 'Reset all stats',
  },
} as Record<keyof typeof Languages, Record<string, string>>;

export default LangPack;
