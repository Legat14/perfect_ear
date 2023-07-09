import { Languages } from '../types/data-types';
import Translation from '../constants/translation';

class HumanReadableData {
  public getTimeHumanReadableStr(time: number, state: keyof typeof Languages): string {
    const millisecsInSec = 1000;
    const secsInMinute = 60;
    const minutes = (time - (time % (millisecsInSec * secsInMinute)))
      / (millisecsInSec * secsInMinute);
    const timeWithoutMinutes = time - (minutes * millisecsInSec * secsInMinute);
    const secounds = (timeWithoutMinutes - (timeWithoutMinutes % millisecsInSec)) / millisecsInSec;
    const millisecouds = timeWithoutMinutes - (secounds * millisecsInSec);
    const millisecsStr = (`000${millisecouds}`).slice(-3);
    const timeString = `${minutes} ${Translation.timeMin[state]} ${secounds}.${millisecsStr} ${Translation.timeSec[state]}`;
    return timeString;
  }
}

export default HumanReadableData;
