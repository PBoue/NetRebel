import {
    AutoCompleteAction,
    AutoCompleteActionType,
    AutoCompleteState,
} from "./AutoComplete.types";

export function autoCompleteReducer(
    state: AutoCompleteState,
    action: AutoCompleteAction
): AutoCompleteState {
    switch (action.type) {
        case AutoCompleteActionType.SetSearchTerm:
            return {
                ...(state || {}),
                searchTerm: action.searchTerm,
            };
        case AutoCompleteActionType.Open:
            return {
                ...(state || {}),
                open: action.open,
            };
        case AutoCompleteActionType.SetValue:
            return {
                ...(state || {}),
                selectedValue: action.value,
                open: false,
                searchTerm: action.newSearchTerm ?? state.searchTerm,
            };
        case AutoCompleteActionType.SetOptions:
            return {
                ...(state || {}),
                options: action.options,
            };
        case AutoCompleteActionType.SetFilteredOptions:
            return {
                ...(state || {}),
                filteredOptions: action.options,
            };
        case AutoCompleteActionType.SetSearchTerm:
            return {
                ...(state || {}),
                searchTerm: action.searchTerm,
            };
    }
}
