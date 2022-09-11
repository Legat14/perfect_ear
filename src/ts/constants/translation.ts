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
    13: 'Тренировка слуха',
    14: 'Тренировка ритма',
    15: 'Фортепиано',
    16: 'Теория',
    17: 'Статистика',
    18: 'Абсолютный слух',
    19: 'Сегодня',
    20: 'Упражнений',
    21: 'Очков',
    22: 'Времени',
    23: 'мин',
    24: 'сек',
    25: 'Играйте ноты, используя клавиатуру или нажимая на клавиши пианино мышью.',
    26: 'За все время',
    27: 'Очков за упражнения на интервалы',
    28: 'Очков за упражнения на гаммы',
    29: 'Очков за упражнения на аккорды',
    30: 'Достижения',
    31: 'Упражнения на <span>интервалы</span>',
    32: 'Упражнения на <span>гаммы',
    33: 'Упражнения на <span>аккорды</span>',
    34: 'Сравнение <span>интервалов</span>',
    35: 'Определение ладов',
    36: 'Определение аккордов',
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
    13: 'Ear Training',
    14: 'Rhythm Training',
    15: 'Fortepiano',
    16: 'Theory',
    17: 'Statistics',
    18: 'Perfect Ear',
    19: 'Today',
    20: 'Exercises',
    21: 'Points',
    22: 'Time',
    23: 'm',
    24: 's',
    25: 'Play notes using the keyboard or by clicking on the piano keys with the mouse.',
    26: 'All time',
    27: 'Points for interval exercises',
    28: 'Points for scale exercises',
    29: 'Points for chord exercises',
    30: 'Achievements',
    31: '<span>Interval</span> exercises',
    32: '<span>Scale</span> exercises',
    33: '<span>Chord</span> exercises',
    34: 'Interval comparison',
    35: 'Scale identification',
    36: 'Chord identification',
  },
} as Record<keyof typeof Languages, Record<string, string>>;

export default LangPack;
