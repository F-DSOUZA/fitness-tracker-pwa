import { Workout } from './context';

export type MonthWithDay = Workout & { cal_date: number };
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
  //readonly meaning it can only be set in the constructor
  readonly data: (Workout | null)[];
  month: MonthInfo;
  test: Array<MonthWithDay | null> = [];

  constructor(page: number, data: (Workout | null)[]) {
    this.data = data;
    this.month = CalendarMonth.MonthMap[page];
  }

  get currentMonth() {
    const MonthWorkoutData: (MonthWithDay | null)[] = this.data.map(
      (item: Workout | null) => {
        if (item !== null) {
          const index: string = item.workout_date.split('/', 1)[0];
          return { cal_date: Number(index), ...item };
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
