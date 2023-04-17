import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { CalendarDate } from "../Calendar.types";
import { isInDecade, isInYear } from "../Calendar.utils";
import "./CalendarYear.scss";

export interface CalendarYearProps {
    date: Date;
    selectedDate?: CalendarDate;
    viewDate: Date;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CalendarYear: React.FC<CalendarYearProps> = ({
    date,
    selectedDate,
    viewDate,
    onClick,
}) => {
    const formattedDate = date ? dayjs(date).format("YYYY") : "",
        isSelected = isInYear(date, selectedDate),
        containsToday = date ? dayjs(date).isSame(new Date(), "year") : false,
        inDecade = isInDecade(date, viewDate),
        css = classNames({
            CalendarYear: true,
            "CalendarYear--isSelected": isSelected,
            "CalendarYear--containsToday": containsToday,
            "CalendarYear--isInDecade": inDecade,
        });
    return (
        <div className={css} onClick={onClick}>
            {formattedDate}
        </div>
    );
};
