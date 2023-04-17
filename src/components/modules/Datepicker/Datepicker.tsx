import classNames from "classnames";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/modules/Calendar";
import { Flyout } from "@/components/modules/Flyout";
import { BaseInputFieldProps } from "@/modules/Forms";
import "./Datepicker.scss";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { parseDate } from "@/modules/Calendar/Calendar.utils";

dayjs.extend(LocalizedFormat);

export interface DatepickerProps extends BaseInputFieldProps {
    value?: string;
    inverted?: boolean;
    onChange?: (value: string) => void;
}

export const Datepicker: React.FC<DatepickerProps> = ({
    inverted,
    error,
    value,
    onChange,
    ...rest
}) => {
    const [internalValue, setInternalValue] = useState(value),
        [open, setOpen] = useState(false),
        css = classNames({
            Datepicker: true,
            "Datepicker--inverted": inverted,
            "Datepicker--error": error,
        }),
        /**
         * Updates the internal value.
         * If triggerEvent is true, it will call onChange if given.
         */
        updateValue = (newValue: string, triggerEvent = true) => {
            setInternalValue(newValue);

            const d = parseDate(newValue),
                valueToPassOn = d ? d.toISOString() : newValue;
            console.log("dispatching value", valueToPassOn, newValue);
            triggerEvent && onChange?.(valueToPassOn);
        },
        /**
         * Handle the focus event on the input field.
         */
        handleOnFocusInput = () => {
            !open && setOpen(true);
        },
        /**
         * Handles the click event on the input field
         */
        handleOnClickInput = () => {
            !open && setOpen(true);
        },
        /**
         * Handles the change event of the input field.
         */
        handleOnChangeInput = (
            e: React.ChangeEvent<HTMLInputElement>
        ): void => {
            const date = e.target.value || "";
            updateValue(date);
        },
        /**
         * Handles the change event of the calendar
         */
        handleOnChangeCalendar = (date: string) => {
            console.log("handleOnChangeCalendar", date);
            updateValue(date);
            setOpen(false);
        },
        /**
         * Handles the open change event of the calendar.
         */
        handleOnChangeOpen = (o: boolean) => {
            setOpen(o);
        };
    useEffect(() => {
        if (internalValue !== value) {
            updateValue(value || "", false);
        }
    }, [value]);

    const d = parseDate(internalValue || ""),
        valueToDisplay = d ? dayjs(d).format("L") : internalValue;
    return (
        <div className={css}>
            <input
                className="Datepicker__input"
                value={valueToDisplay}
                type={"text"}
                onChange={handleOnChangeInput}
                onClick={handleOnClickInput}
                onFocus={handleOnFocusInput}
                {...rest}
            />
            <Flyout
                open={open}
                onChangeOpen={handleOnChangeOpen}
                clickOutsideIgnoreClasses={["Datepicker"]}
            >
                <Calendar
                    value={internalValue}
                    onChange={handleOnChangeCalendar}
                ></Calendar>
            </Flyout>
        </div>
    );
};
