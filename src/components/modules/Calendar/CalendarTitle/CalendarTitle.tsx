import dayjs from "dayjs";
import React from "react";
import {
    CalendarBuildConfig,
    CalendarDate,
    CalendarViewMode,
} from "../Calendar.types";
import { startOfDecade } from "../Calendar.utils";
import "./CalendarTitle.scss";

export interface CalendarTitleProps {
    buildConfig: CalendarBuildConfig;
    viewMode: CalendarViewMode;
}

export const CalendarTitle: React.FC<CalendarTitleProps> = ({
    buildConfig,
    viewMode,
}) => {
    const d = buildConfig.viewDate;
    if (!d) {
        return null;
    }
    let title = "";
    switch (viewMode) {
        case CalendarViewMode.Days:
            title = dayjs(d).format("MMMM YYYY");
            break;
        case CalendarViewMode.Months:
            title = dayjs(d).format("YYYY");
            break;
        case CalendarViewMode.Years:
            const start = startOfDecade(buildConfig.viewDate),
                end = start.add(10, "years");
            title = `${dayjs(start).format("YYYY")} - ${dayjs(end).format(
                "YYYY"
            )}`;
            break;
    }
    return <div className="CalendarTitle">{title}</div>;
};
