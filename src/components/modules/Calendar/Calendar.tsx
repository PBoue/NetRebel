import classNames from "classnames";
import dayjs from "dayjs";
import React, { useReducer, useEffect } from "react";
import { CalendarDay } from "./CalendarDay/CalendarDay";
import { CalendarMonth } from "./CalendarMonth/CalendarMonth";
import { CalendarYear } from "./CalendarYear/CalendarYear";
import { CalendarTitle } from "./CalendarTitle/CalendarTitle";
import { calendarReducer } from "./Calendar.reducer";
import { Icon, IconName } from "@/elements/index";

import "./Calendar.scss";

import {
    CalendarActionType,
    CalendarMoveDirection,
    CalendarViewMode,
    InitialCalendarState,
} from "./Calendar.types";

import { createBuildConfig, parseDate } from "./Calendar.utils";

import "dayjs/locale/de";

dayjs.locale("de");

export interface CalendarProps {
    value?: Date | string;
    minDate?: Date | string;
    maxDate?: Date | string;
    onChange?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
    value,
    minDate,
    maxDate,
    onChange,
}) => {
    const parsedValue = parseDate(value || ""),
        [state, dispatch] = useReducer(calendarReducer, {
            ...InitialCalendarState,
            buildConfig: createBuildConfig(parsedValue || new Date()),
            value: parsedValue,
        }),
        handleOnPrev = () => {
            dispatch({
                type: CalendarActionType.MoveTo,
                direction: CalendarMoveDirection.Prev,
            });
        },
        handleOnNext = () => {
            dispatch({
                type: CalendarActionType.MoveTo,
                direction: CalendarMoveDirection.Next,
            });
        },
        handleOnCycleViewMode = () => {
            dispatch({
                type: CalendarActionType.SetViewMode,
                viewMode: (state.viewMode + 1) % 3,
            });
        },
        handleOnSelectDate = (date: Date) => () => {
            dispatch({ type: CalendarActionType.SetValue, value: date });
            onChange?.(date.toISOString());
        },
        handleOnSelectMonth = (date: Date) => () => {
            const viewDate: Date = dayjs(state.buildConfig.viewDate)
                .month(date.getMonth())
                .toDate();
            dispatch({ type: CalendarActionType.SetViewDate, date: viewDate });
            dispatch({
                type: CalendarActionType.SetViewMode,
                viewMode: CalendarViewMode.Days,
            });
        },
        handleOnSelectYear = (date: Date) => () => {
            const viewDate: Date = dayjs(state.buildConfig.viewDate)
                .year(date.getFullYear())
                .toDate();
            dispatch({ type: CalendarActionType.SetViewDate, date: viewDate });
            dispatch({
                type: CalendarActionType.SetViewMode,
                viewMode: CalendarViewMode.Months,
            });
        },
        isSelectable = (date: Date): boolean => {
            const d = dayjs(date);
            if (minDate) {
                if (d.isBefore(minDate)) {
                    return false;
                }
            }

            if (maxDate) {
                if (d.isAfter(maxDate)) {
                    return false;
                }
            }

            return true;
        },
        css = classNames({
            Calendar: true,
            [`Calendar--animation-${state.animationDirection}`]: true,
        });

    useEffect(() => {
        dispatch({
            type: CalendarActionType.SetValue,
            value: parseDate(value || ""),
        });
    }, [value]);

    return (
        <div className={css}>
            <div className="Calendar__header">
                <button
                    className="Calendar__header__prev"
                    onClick={handleOnPrev}
                >
                    <Icon name={IconName.Arrow_ChevronLeft}></Icon>
                </button>
                <div
                    className="Calendar__header__title"
                    onClick={handleOnCycleViewMode}
                >
                    <CalendarTitle
                        buildConfig={state.buildConfig}
                        viewMode={state.viewMode}
                    ></CalendarTitle>
                </div>
                <button
                    className="Calendar__header__next"
                    onClick={handleOnNext}
                >
                    <Icon name={IconName.Arrow_ChevronRight}></Icon>
                </button>
            </div>
            <div className="Calendar__body">
                {state.viewMode === CalendarViewMode.Days && (
                    <div className="Calendar__view__days">
                        <div className="Calendar__calendar">
                            <div className="Calendar__calendar__weekDays">
                                {state.buildConfig?.weekdays.map((weekday) => {
                                    return (
                                        <div
                                            key={weekday}
                                            className="Calendar__calendar__weekDay"
                                        >
                                            {weekday}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="Calendar__calendar__weeks">
                                {state.buildConfig?.weeks.map(
                                    (daysInWeek, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="Calendar__calendar__week"
                                            >
                                                {daysInWeek.map((day) => {
                                                    const key =
                                                            dayjs(day).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                        disabled =
                                                            !isSelectable(day);
                                                    return (
                                                        <CalendarDay
                                                            key={key}
                                                            date={day}
                                                            selectedDate={
                                                                state.value
                                                            }
                                                            viewDate={
                                                                state
                                                                    .buildConfig
                                                                    ?.viewDate
                                                            }
                                                            disabled={disabled}
                                                            onClick={handleOnSelectDate(
                                                                day
                                                            )}
                                                        ></CalendarDay>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {state.viewMode === CalendarViewMode.Months && (
                    <div className="Calendar__view__months">
                        {state.buildConfig.months.map((month) => {
                            const key = dayjs(month).format("YYYY-MM");
                            return (
                                <CalendarMonth
                                    key={key}
                                    date={month}
                                    selectedDate={state.value}
                                    viewDate={state.buildConfig.viewDate}
                                    onClick={handleOnSelectMonth(month)}
                                ></CalendarMonth>
                            );
                        })}
                    </div>
                )}
                {state.viewMode === CalendarViewMode.Years && (
                    <div className="Calendar__view__years">
                        {state.buildConfig.years.map((year) => {
                            const key = year.getFullYear();
                            return (
                                <CalendarYear
                                    key={key}
                                    date={year}
                                    selectedDate={state.value}
                                    viewDate={state.buildConfig.viewDate}
                                    onClick={handleOnSelectYear(year)}
                                ></CalendarYear>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
