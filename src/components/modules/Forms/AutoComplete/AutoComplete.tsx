import classNames from "classnames"
import React, { ReactNode, useEffect, useReducer } from "react"
import { Flyout } from "@/modals/Flyouts"
import { TextType, Text } from "@/common/Text"
import { Textfield } from "@/components/Forms/Textfield"
import { autoCompleteReducer } from "./AutoComplete.reducer"
import "./AutoComplete.scss"
import {
    AutoCompleteActionType,
    InitialAutoCompleteState,
} from "./AutoComplete.types";
import { searchDeep } from "./AutoComplete.utils";
export interface AutoCompleteRenderInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}
export interface AutoCompleteProps<T = any> {
    value?: T;
    options?: T[];
    filteredOptions?: T[];
    resultsLabel?: string;
    inputPlaceholder?: string;
    onChange?: (value: T) => void;
    onSearchTermChange?: (searchTerm: string) => void;
    getValueFromOption?: (option: T) => string;
    getLabelFromOption?: (option: T) => string;
    filterOption?: (searchTerm: string, option: any) => boolean;
    renderOption?: (option: T) => ReactNode;
    renderInput?: (props: AutoCompleteRenderInputProps) => ReactNode;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
    value,
    options = [],
    filteredOptions,
    resultsLabel = "Vorschläge",
    inputPlaceholder = "Suchen",
    onChange,
    onSearchTermChange,
    filterOption = (searchTerm: string, option: any) =>
        searchDeep(searchTerm, option),
    getValueFromOption = (option: any) => {
        return option;
    },
    getLabelFromOption = (option: any) => {
        return option;
    },
    renderInput,
    renderOption,
}) => {
    const [state, dispatch] = useReducer(autoCompleteReducer, {
            ...InitialAutoCompleteState,
            selectedValue: value,
            options: options,
        }),
        hasFileredOptions = typeof filteredOptions !== "undefined",
        handleOnChangeSearchTerm = (
            e: string | React.ChangeEvent<HTMLInputElement>
        ) => {
            const v = typeof e === "string" ? e : e.target.value;
            dispatch({
                type: AutoCompleteActionType.SetSearchTerm,
                searchTerm: v,
            });
            onSearchTermChange?.(v);
            if (hasFileredOptions) {
                // if filteredOptions are given, we use them instead of filtering
                // the give options based on the search term.
                return;
            }
            dispatch({
                type: AutoCompleteActionType.SetFilteredOptions,
                options: state.options.filter((o) => filterOption(v, o)),
            });
        },
        handleOnFocus = () => {
            dispatch({ type: AutoCompleteActionType.Open, open: true });
        },
        handleOnBlur = () => {
            dispatch({ type: AutoCompleteActionType.Open, open: false });
        },
        handleOnChangeOpen = (open: boolean) => {
            dispatch({ type: AutoCompleteActionType.Open, open: open });
        },
        handleOnClickOption = (option: any) => () => {
            dispatch({
                type: AutoCompleteActionType.SetValue,
                value: option,
                newSearchTerm: getLabelFromOption(option),
            });
            dispatch({
                type: AutoCompleteActionType.Open,
                open: false,
            });
            onChange?.(option);
        },
        isSelected = (option: any, selectedOption: any): boolean => {
            if (!selectedOption) {
                return false;
            }
            return getValueFromOption(option) === state.selectedValue;
        },
        doRenderOption = (option: any): ReactNode => {
            if (typeof renderOption === "function") {
                return renderOption(option);
            }
            return getLabelFromOption(option);
        },
        inputProps: AutoCompleteRenderInputProps = {
            onChange: handleOnChangeSearchTerm,
            value: state.searchTerm,
        },
        css = classNames({
            AutoComplete: true,
            "AutoComplete--open": state.open,
        }),
        optionsToRender = hasFileredOptions
            ? filteredOptions
            : state.filteredOptions || [],
        shouldOpenFlyout = state.open && optionsToRender.length > 0;

    useEffect(() => {
        if (value !== state.selectedValue) {
            dispatch({ type: AutoCompleteActionType.SetValue, value: value });
        }
    }, [value]);

    useEffect(() => {
        dispatch({
            type: AutoCompleteActionType.SetFilteredOptions,
            options: filteredOptions || [],
        });
    }, [filteredOptions]);
    return (
        <div className={css} onFocus={handleOnFocus} onBlur={handleOnBlur}>
            <div className="AutoComplete__input" onClick={handleOnFocus}>
                {renderInput ? (
                    renderInput(inputProps)
                ) : (
                    <Textfield
                        type="search"
                        {...inputProps}
                        placeholder={inputPlaceholder}
                    ></Textfield>
                )}
            </div>
            <Flyout
                noPadding={true}
                fullWidth={true}
                open={shouldOpenFlyout}
                onChangeOpen={handleOnChangeOpen}
                clickOutsideIgnoreClasses={["AutoComplete"]}
            >
                <div className="AutoComplete__result">
                    <Text
                        className="AutoComplete__result__label"
                        type={TextType.BodySmall}
                        tag="span"
                    >
                        {resultsLabel}
                    </Text>
                    <ul className="AutoComplete__result__list">
                        {optionsToRender.map((option) => {
                            const key = JSON.stringify(option),
                                selected = isSelected(
                                    option,
                                    state.selectedValue
                                ),
                                css = classNames({
                                    AutoComplete__result__option: true,
                                    "AutoComplete__result__option--selected":
                                        selected,
                                });
                            return (
                                <li
                                    key={key}
                                    onClick={handleOnClickOption(option)}
                                    className={css}
                                >
                                    {doRenderOption(option)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Flyout>
        </div>
    );
};
