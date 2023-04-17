import dayjs, { OpUnitType } from "dayjs";
import { createBuildConfig } from "./Calendar.utils";

export type CalendarDate = Date | string | dayjs.Dayjs;

export interface CalendarBuildConfig {
    /**
     * viewDate is used to determine the month that should be displayed
     */
    viewDate: Date;
    weekdays: string[];
    weeks: Date[][];
    /**
     * The months to display in the months view
     */
    months: Date[];
    /**
     * The years to display in the years view.
     */
    years: Date[];
}

export enum CalendarViewMode {
    Days = 0,
    Months = 1,
    Years = 2,
}

export enum CalendarMoveDirection {
    Prev = -1,
    Next = 1,
}

export enum CalendarAnimationDirection {
    In = "in",
    Out = "out",
}

export interface CalendarState {
    viewMode: CalendarViewMode;
    buildConfig: CalendarBuildConfig;
    value: CalendarDate | undefined;
    animationDirection: CalendarAnimationDirection;
}

export const InitialCalendarState: CalendarState = {
    viewMode: CalendarViewMode.Days,
    buildConfig: createBuildConfig(new Date()),
    value: undefined,
    animationDirection: CalendarAnimationDirection.Out,
};

export enum CalendarActionType {
    SetViewMode = "setViewMode",
    SetViewDate = "setViewDate",
    SetValue = "setValue",
    MoveTo = "moveTo",
}

export type CalendarAction =
    | {
          type: CalendarActionType.SetViewMode;
          viewMode: CalendarViewMode;
      }
    | {
          type: CalendarActionType.SetViewDate;
          date: Date | string | dayjs.Dayjs;
      }
    | {
          type: CalendarActionType.SetValue;
          value: CalendarDate | undefined;
      }
    | {
          type: CalendarActionType.MoveTo;
          direction: CalendarMoveDirection;
      };
