import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { Icon, IconName } from "@/elements/index"
import { BaseInputFieldProps } from "@/modules/index"
import { DropdownOption } from "./Dropdown.types"
import { Text, TextType } from "@/elements/index"

import "./Dropdown.scss";

export interface DropdownProps extends BaseInputFieldProps {
    options?: DropdownOption[];
    inverted?: boolean;
    inline?: boolean;
}

export const Dropdown: React.FC<
    DropdownProps &
        React.DetailedHTMLProps<
            React.SelectHTMLAttributes<HTMLSelectElement>,
            HTMLSelectElement
        >
> = ({
    options = [],
    inverted,
    inline,
    value = "",
    onChange: externalOnChange,
    error,
    ...rest
}) => {
    const [selectedValue, setSelectedValue] = useState(value),
        css = classNames({
            Dropdown: true,
            "Dropdown--inverted": inverted,
            "Dropdown--inline": inline,
            "Dropdown--error": error,
        }),
        iconToUse = IconName.Arrow_ChevronDuoDown,
        getLabelByValue = () => {
            if (!selectedValue) {
                return options.length > 0 ? options[0].label : "";
            }
            return options.length > 0
                ? options.filter((o) => o.value == selectedValue)[0].label
                : "";
        },
        handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedValue(e.target.value);
            externalOnChange?.(e);
        };

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <div className={css}>
            {inline && (
                <Text type={TextType.SpecialHeader}>{getLabelByValue()}</Text>
            )}
            <select
                className="Dropdown__select"
                value={selectedValue}
                onChange={(e) => handleOnChange(e)}
                {...rest}
            >
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            <div className="Dropdown__icon">
                <Icon name={iconToUse}></Icon>
            </div>
        </div>
    );
};
