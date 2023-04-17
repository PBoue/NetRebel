import React, { FormEvent } from "react";

export type FormFields = { [key: string]: any };

export type FormControlError = string;

export type FormControlErrors<S extends FormFields = FormFields> = {
    [Property in keyof S]?: {
        [validatorName: string]: {
            result: FormControlValidationResult;
            message?: string;
        };
    };
};

export type FormControlValidationError = {
    [key: string]: any;
};

export type FormControlValidationResult = FormControlValidationError | null;

export type FormControlValidator = (
    valueToValidate: any
) => Promise<FormControlValidationResult>;

export type FormControlValidatorMessage =
    | string
    | ((result: FormControlValidationResult) => string);

export type FormControlValidatorSetup = [
    FormControlValidator,
    FormControlValidatorMessage
];

export type FormControlParams = {
    validators?: {
        [name: string]: FormControlValidatorSetup;
    };
    onChange?: (...args: any[]) => any;
};

export interface FormControl {
    name: string;
    validators: {
        [validatorName: string]: FormControlValidatorSetup;
    };
    isValid: boolean;
    isDirty: boolean;
    isValidationPending: boolean;
    touched: boolean;
    errors: {
        [validatorName: string]: {
            result: FormControlValidationResult;
            message?: string;
        };
    };
    errorMessages: string[];
    value: any;
}

export interface FormControlResultProps {
    onChange: (...args: any[]) => void;
    onBlur: () => void;
    name: string;
    value?: any;
    checked?: boolean;
}

export interface RadioFormControlResultProps {
    add: (value: any) => FormControlResultProps;
}

export interface CheckboxFormControlResultProps {
    add: (value: any) => FormControlResultProps;
}

export type FormControlOption<S> = (
    field: keyof S,
    params?: FormControlParams
) => FormControlResultProps;

export type RadioFormControlOption<S> = (
    field: keyof S,
    params?: FormControlParams
) => RadioFormControlResultProps;

export type CheckboxFormControlOption<S> = (
    field: keyof S,
    params?: FormControlParams
) => CheckboxFormControlResultProps;

export type UseFormSubmitHandler<S> = (data: S) => Promise<void>;

export interface UseFormState<S extends FormFields = FormFields> {
    isSubmitting: boolean;
    isValid: boolean;
    isValidationPending: boolean;
    data: S;
}

export interface UseFormControl<S extends FormFields = FormFields> {
    controls: {
        [Property in keyof S]?: FormControl;
    };
    formState: UseFormState<S>;
}

export interface UseFormResult<S extends FormFields = FormFields>
    extends UseFormControl<S> {
    onSubmit: (handler: (data: S) => Promise<void>) => (e: FormEvent) => void;
    removeControl: (name: keyof S) => void;
    addControl: FormControlOption<S>;
    radio: RadioFormControlOption<S>;
    checkbox: CheckboxFormControlOption<S>;
    setValue: (name: keyof S, value: any) => void;
}
