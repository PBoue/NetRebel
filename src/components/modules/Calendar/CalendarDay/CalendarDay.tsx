import classNames from "classnames";
import React from "react";
import { CalendarDate } from "../Calendar.types";
import { isInMonth, isSameDay, isToday } from "../Calendar.utils";
import "./CalendarDay.scss";

export interface CalendarDayProps {
    date: Date;
    selectedDate?: CalendarDate;
    viewDate?: Date;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
    date,
    viewDate,
    selectedDate,
    disabled,
    onClick,
}) => {
    const css = classNames({
        CalendarDay: true,
        "CalendarDay--disabled": disabled,
        "CalendarDay--isSelected": isSameDay(date, selectedDate || undefined),
        "CalendarDay--isInCurrentMonth": isInMonth(date, viewDate),
        "CalendarDay--isToday": isToday(date),
    });
    return (
        <div className={css} onClick={onClick}>
            {date?.getDate() || ""}
        </div>
    );
};
