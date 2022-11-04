import { Workout } from './context';
import Runner from '../assets/images/Runner.svg';
import Bootcamp from '../assets/images/Bootcamp.svg';
import Spin from '../assets/images/Spin.svg';
import Football from '../assets/images/Football.svg';
import Other from '../assets/images/Other.svg';
import Tennis from '../assets/images/Tennis.svg';
import Walking from '../assets/images/Walk.svg';
import Weights from '../assets/images/Weights.svg';
import Yoga from '../assets/images/Yoga.svg';
import Pilates from '../assets/images/Pilates.svg';

export type MonthWithDay = Workout & {
  cal_date: number;
  img_url: string;
};
interface MonthInfo {
  name: string;
  days: number;
}

export class CalendarMonth {
  static MonthMap: MonthInfo[] = [
    { name: 'January', days: 31 },
    { name: 'February', days: 31 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  static ImageMap: Record<string, string> = {
    bootcamp: Bootcamp,
    football: Football,
    other: Other,
    pilates: Pilates,
    running: Runner,
    spinning: Spin,
    tennis: Tennis,
    walking: Walking,
    weights: Weights,
    yoga: Yoga,
  };

  //readonly meaning it can only be set in the constructor
  readonly data: (Workout | null)[];
  month: MonthInfo;
  test: Array<MonthWithDay | null> = [];

  constructor(page: number, data: (Workout | null)[]) {
    this.data = data;
    this.month = CalendarMonth.MonthMap[page];
  }

  static getImgUrl(workout_type: string): string {
    for (const [key, value] of Object.entries(CalendarMonth.ImageMap)) {
      if (key.includes(workout_type.toLowerCase())) {
        return value;
      }
    }
    return CalendarMonth.ImageMap['other'];
  }

  get currentMonth() {
    const MonthWorkoutData: (MonthWithDay | null)[] = this.data.map(
      (item: Workout | null) => {
        if (item !== null) {
          const index: string = item.workout_date.split('/', 1)[0];
          const img = CalendarMonth.getImgUrl(item.workout_type);
          return { cal_date: Number(index), img_url: img, ...item };
        }
        return null;
      }
    );
    let i = 0;
    const currentMonth = [];
    while (i < this.month.days) {
      i++;
      const day = MonthWorkoutData.find(
        (workout: MonthWithDay | null) => workout && workout.cal_date == i
      );
      if (day != null) {
        currentMonth.push(day);
      } else {
        currentMonth.push({ cal_date: i });
      }
    }
    return currentMonth;
  }
}
