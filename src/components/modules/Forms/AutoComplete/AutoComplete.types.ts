export interface AutoCompleteState<T = any> {
    open: boolean;
    searchTerm: string;
    selectedValue: T | null;
    options: T[];
    filteredOptions: T[];
}

export const InitialAutoCompleteState: AutoCompleteState = {
    open: false,
    searchTerm: "",
    selectedValue: null,
    options: [],
    filteredOptions: [],
};

export enum AutoCompleteActionType {
    SetSearchTerm = "setSearchTerm",
    SetValue = "setValue",
    Open = "open",
    SetOptions = "setOptions",
    SetFilteredOptions = "setFilteredOptions",
}

export type AutoCompleteAction =
    | {
          type: AutoCompleteActionType.Open;
          open: boolean;
      }
    | {
          type: AutoCompleteActionType.SetValue;
          value: any;
          newSearchTerm?: string;
      }
    | {
          type: AutoCompleteActionType.SetOptions;
          options: any[];
      }
    | {
          type: AutoCompleteActionType.SetFilteredOptions;
          options: any[];
      }
    | {
          type: AutoCompleteActionType.SetSearchTerm;
          searchTerm: string;
      };
