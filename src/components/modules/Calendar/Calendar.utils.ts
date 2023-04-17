import dayjs from "dayjs";
import { CalendarBuildConfig, CalendarDate } from "./Calendar.types";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de";
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.locale("de");
/**
 * Creates the weekdays. We do not make it const because
 * it needs to react to locale changes.
 */
export function createWeekdays(): string[] {
    return [...Array(7)]
        .map((_, i) => dayjs().weekday(i))
        .map((d) => d.format("ddd"))
        .map((d) => d.replace(".", ""));
}

/**
 * Returns the months used in the months view
 * @returns
 */
export function createMonths(viewDate: CalendarDate): Date[] {
    const start: dayjs.Dayjs = startOfYear(viewDate).subtract(2, "months");
    return [...Array(16)].map((_, i) => dayjs(start).add(i, "months").toDate());
}

/**
 * Returns the years used in the years view
 * @param viewDate
 * @returns
 */
export function createYears(viewDate: CalendarDate): Date[] {
    const start: dayjs.Dayjs = startOfDecade(viewDate).subtract(3, "years");
    return [...Array(16)].map((_, i) => dayjs(start).add(i, "years").toDate());
}

/**
 * Creates a build config for the given date.
 * @param date
 * @param weeksToRender
 * @returns
 */
export function createBuildConfig(
    date: CalendarDate,
    weeksToRender = 6
): CalendarBuildConfig {
    const d = dayjs(parseDate(date) || new Date()),
        start: dayjs.Dayjs = d.startOf("month").startOf("week"),
        weeks: Date[][] = [];
    let currentDate: dayjs.Dayjs = start,
        week: Date[] = [];
    for (let w = 0; w < weeksToRender; w++) {
        week = [];
        for (let i = 0; i < 7; i++) {
            week.push(currentDate.toDate());
            currentDate = currentDate.add(1, "day");
        }
        weeks.push(week);
    }
    return {
        weekdays: createWeekdays(),
        viewDate: d.toDate(),
        weeks: weeks,
        months: createMonths(date),
        years: createYears(date),
    };
}
/**
 * Returns the start of the week for the given date as a dayjs date.
 * @param date
 */
export function startOfMonth(date: CalendarDate): dayjs.Dayjs {
    return dayjs(date).hour(12).startOf("month");
}
/**
 * Returns the start of the year for the given date as a dayjs date.
 * @param date
 */
export function startOfYear(date: CalendarDate): dayjs.Dayjs {
    return dayjs(date).hour(12).startOf("year");
}

/**
 * Returns the middle of the month for the given date
 * as dayjs date.
 * @param date
 * @returns
 */
export function middleOfMonth(date: CalendarDate): dayjs.Dayjs {
    return dayjs(date).date(15);
}

/**
 * Returns the start of the decade
 * @param date
 * @returns
 */
export function startOfDecade(date: CalendarDate): dayjs.Dayjs {
    const d = dayjs(date),
        year = Math.floor(d.toDate().getFullYear() / 10) * 10;
    return d.year(year).date(1).month(0);
}

/**
 * Returns true if the given date matches today.
 * @param date
 * @returns
 */
export function isToday(date: CalendarDate): boolean {
    return dayjs(date).isSame(new Date(), "day");
}

/**
 * Returns true if the given date matches today.
 * @param date
 * @returns
 */
export function isSameDay(
    date: CalendarDate,
    compareTo?: CalendarDate
): boolean {
    if (!date || !compareTo) {
        return false;
    }
    return dayjs(date).isSame(compareTo, "day");
}

/**
 * Returns true if the given date is in the same month. ())
 * @param date
 * @param month
 * @returns
 */
export function isInMonth(date: CalendarDate, month?: CalendarDate): boolean {
    if (!date || !month) {
        return false;
    }
    return dayjs(date).isSame(month, "month");
}
/**
 * Returns true if the given date is in the same month. ())
 * @param date
 * @param month
 * @returns
 */
export function isInYear(date: CalendarDate, year?: CalendarDate): boolean {
    if (!date || !year) {
        return false;
    }
    return dayjs(date).isSame(year, "year");
}

/**
 * Returns true if the given date is in the same decade as the viewDate.
 * @param date
 * @param viewDate
 * @returns
 */
export function isInDecade(
    date: CalendarDate,
    viewDate: CalendarDate
): boolean {
    const start = startOfDecade(viewDate),
        end = start.add(10, "years");
    return dayjs(date).isBetween(start, end, "year", "[]");
}

export function parseDate(
    dateToParse: CalendarDate,
    validFormats: string[] = [
        "YYYY-MM-DDTHH:mm:ss.SSSZ",
        "YYYY-MM-DD",
        "DD.MM.YYYY",
    ]
): Date | undefined {
    if (!dateToParse) {
        return undefined;
    }
    if (dateToParse instanceof Date) {
        return !isNaN(dateToParse.getTime()) ? dateToParse : undefined;
    }
    const d = dayjs(dateToParse, validFormats);
    return d.isValid() ? d.toDate() : undefined;
}
