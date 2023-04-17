import { OpUnitType } from "dayjs";
import {
    CalendarAction,
    CalendarActionType,
    CalendarAnimationDirection,
    CalendarState,
    CalendarViewMode,
} from "./Calendar.types";
import { createBuildConfig, middleOfMonth } from "./Calendar.utils";

export function calendarReducer(
    state: CalendarState,
    action: CalendarAction
): CalendarState {
    switch (action.type) {
        case CalendarActionType.SetViewMode:
            return {
                ...(state || {}),
                viewMode: action.viewMode,
                animationDirection:
                    action.viewMode > state.viewMode
                        ? CalendarAnimationDirection.Out
                        : CalendarAnimationDirection.In,
            };
        case CalendarActionType.SetViewDate:
            return {
                ...(state || {}),
                buildConfig: createBuildConfig(action.date),
            };
        case CalendarActionType.SetValue:
            return {
                ...(state || {}),
                value: action.value,
            };
        case CalendarActionType.MoveTo:
            const viewDate = state.buildConfig!.viewDate,
                baseDate = middleOfMonth(viewDate),
                amount =
                    (state.viewMode === CalendarViewMode.Years ? 10 : 1) *
                    action.direction,
                unit: OpUnitType = [
                    CalendarViewMode.Months,
                    CalendarViewMode.Years,
                ].includes(state.viewMode)
                    ? "years"
                    : "months",
                newViewDate = baseDate.add(amount, unit);
            return {
                ...(state || {}),
                buildConfig: createBuildConfig(newViewDate),
            };
    }
}
