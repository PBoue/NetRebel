import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { CalendarDate } from "../Calendar.types";
import { isInMonth, isInYear } from "../Calendar.utils";
import "./CalendarMonth.scss";

export interface CalendarMonthProps {
    date: Date;
    selectedDate?: CalendarDate;
    viewDate: Date;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
    date,
    selectedDate,
    viewDate,
    onClick,
}) => {
    const formattedDate = date ? dayjs(date).format("MMM") : "",
        isSelected = isInMonth(date, selectedDate),
        containsToday = date ? dayjs(date).isSame(new Date(), "month") : false,
        css = classNames({
            CalendarMonth: true,
            "CalendarMonth--isSelected": isSelected,
            "CalendarMonth--containsToday": containsToday,
            "CalendarMonth--isInYear": isInYear(date, viewDate),
        });
    return (
        <div className={css} onClick={onClick}>
            {formattedDate}
        </div>
    );
};
