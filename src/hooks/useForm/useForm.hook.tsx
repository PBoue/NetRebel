import React, { FormEvent, useCallback, useRef, useState } from "react";
import {
    CheckboxFormControlResultProps,
    FormControl,
    FormControlParams,
    FormControlResultProps,
    FormControlValidationResult,
    FormFields,
    RadioFormControlResultProps,
    UseFormControl,
    UseFormResult,
    UseFormState,
} from "./useForm.types";

function createControl(): FormControl {
    return {
        name: "",
        validators: {},
        isValid: true,
        isDirty: false,
        isValidationPending: false,
        touched: false,
        errors: {},
        errorMessages: [],
        value: undefined,
    };
}

// Hook
export function useForm<S extends FormFields>(
    data: S | null = null
): UseFormResult<S> {
    const formControl = useRef<UseFormControl<S>>({
            controls: {},
            formState: {
                isSubmitting: false,
                isValid: true,
                isValidationPending: false,
                data: data || ({} as S),
            },
        }),
        [_, _updateState] = useState<UseFormState<S>>(
            formControl.current.formState
        ),
        updateState = useCallback(_updateState, [_updateState]),
        /**
         * Triggers a rerender using "updateState" and compiles the data
         * part of the state based on the values present in each control
         */
        compileState = useCallback(
            (newState?: Partial<UseFormState<S>>): UseFormState<S> => {
                formControl.current.formState = {
                    ...formControl.current.formState,
                    ...(newState || {}),
                    ...getDerivedStateFromControls(),
                };
                updateState({ ...formControl.current.formState });
                return formControl.current.formState;
            },
            [formControl.current, updateState]
        ),
        /**
         * Computes the data part of the state. It collects the data
         * present in  the "controls" part and computes values like isValidationPending
         */
        getDerivedStateFromControls = (): Partial<UseFormState<S>> => {
            const fc = formControl.current,
                controls: FormControl[] = Object.keys(fc.controls).map(
                    (name) => fc.controls[name]
                ) as FormControl[],
                s: Partial<UseFormState<S>> = {
                    isValid: controls.filter((c) => !c?.isValid).length === 0,
                    isValidationPending:
                        controls.filter((c) => c?.isValidationPending).length >
                        0,
                    data: controls.reduce((acc, c) => {
                        acc[c.name as keyof S] = c.value;
                        return acc;
                    }, {} as S),
                };

            return s;
        },
        /**
         * Returns a control with the given name.
         */
        getControl = (name: keyof S): FormControl | undefined => {
            const fc = formControl.current,
                { controls } = fc,
                c = controls[name];
            return c;
        },
        /**
         * Sets the value for the control with the given name.
         */
        setValue = (name: keyof S, value: any): void => {
            const c = getControl(name);
            if (c) {
                c.value = value;
            }
            compileState();
        },
        /**
         * Returns the value for the control with the given name.
         */
        getValue = (name: keyof S): any => {
            const c = getControl(name);
            return c?.value;
        },
        /**
         * Validates a control with the given name
         */
        validateControl = async (name: keyof S): Promise<void> => {
            const c = getControl(name),
                validatorNames = Object.keys(c?.validators || {}),
                hasValidators = validatorNames.length > 0;

            if (!c || !hasValidators) {
                return;
            }

            const value = getValue(name),
                fieldErrors: {
                    [validatorName: string]: {
                        result: FormControlValidationResult;
                        message?: string;
                    };
                } = {};
            let isValid = true;
            c.isValidationPending = true;
            compileState();

            for (let v of validatorNames) {
                const [validator, errorMessageCompiler] = c.validators[v],
                    isErrorMessageFunction =
                        typeof errorMessageCompiler === "function",
                    result = await validator(value),
                    hasError = result !== null,
                    message = isErrorMessageFunction
                        ? errorMessageCompiler(result)
                        : errorMessageCompiler;

                fieldErrors[v] = {
                    result: result,
                    message: hasError ? message : "",
                };

                if (isValid) {
                    isValid = !hasError;
                }
            }
            c.errors = fieldErrors;
            c.isValid = isValid;
            c.isValidationPending = false;
            c.errorMessages = Object.values(fieldErrors)
                .map((v) => v.message)
                .filter((m) => !!m) as string[];
            compileState();
        },
        /**
         * Validates the form
         */
        validate = async (): Promise<boolean> => {
            const f = formControl.current,
                controlNames = Object.keys(f.controls);
            await Promise.allSettled(
                controlNames.map((cName) => validateControl(cName))
            );
            return f.formState.isValid;
        },
        /**
         * The form submit handler that should be passed to the <form> tag onSubmit event
         */
        onSubmit = (handler: (data: S) => Promise<void>) => {
            return async (e: FormEvent) => {
                const s = formControl.current.formState;
                e.preventDefault();
                if (s.isSubmitting) {
                    return;
                }
                compileState({
                    isSubmitting: true,
                });

                const isValid = await validate();

                if (!isValid) {
                    compileState({
                        isSubmitting: false,
                    });
                    return;
                }

                try {
                    await handler?.(s.data);
                } catch (e) {
                    throw e;
                } finally {
                    compileState({
                        isSubmitting: false,
                    });
                }
            };
        },
        /**
         * Function to register a control for an input element.
         */
        addControl = (
            name: keyof S,
            params?: FormControlParams
        ): FormControlResultProps => {
            const fc = formControl.current;
            if (!fc.controls[name]) {
                fc.controls[name] = {
                    ...createControl(),
                    ...(fc.controls[name] || {}),
                    name: name as string,
                    value: data ? data[name] : undefined,
                    validators: params?.validators || {},
                };
            }

            return {
                onChange: (...args: any[]) => {
                    let v;
                    if (params?.onChange) {
                        v = params.onChange.apply(null, args);
                    } else {
                        const e =
                            args[0] as React.ChangeEvent<HTMLInputElement>;
                        v = e.target.value;
                    }

                    setValue(name, v);
                },
                onBlur: () => {
                    validateControl(name);
                },
                value: getValue(name) || "",
                name: name as string,
            };
        },
        removeControl = (name: keyof S) => {
            delete formControl.current.controls[name];
            compileState();
        },
        radio = (
            name: keyof S,
            params?: FormControlParams
        ): RadioFormControlResultProps => {
            const { onBlur, onChange } = addControl(name, params);

            return {
                add: (value: any) => {
                    return {
                        onBlur: onBlur,
                        onChange: (...args: any[]) => {
                            onChange.apply(null, args as any);
                            validateControl(name);
                        },
                        name: name as string,
                        value: value,
                        checked: value === getValue(name),
                    };
                },
            };
        },
        checkbox = (
            name: keyof S,
            params?: FormControlParams
        ): CheckboxFormControlResultProps => {
            const c = radio(name, params);

            return {
                add: (value: any) => {
                    const existingValues: any[] = getValue(name) || [];
                    return {
                        ...c.add(value),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            const isChecked = e.target.checked,
                                newValue = [...existingValues, value]
                                    .filter((v) =>
                                        !isChecked && v === value ? false : true
                                    )
                                    .filter((value, index, self) => {
                                        return self.indexOf(value) === index;
                                    });
                            setValue(name, newValue);
                            validateControl(name);
                        },
                        value: value,
                        checked: existingValues.includes(value),
                    };
                },
            };
        };

    return {
        onSubmit: onSubmit,
        addControl: addControl,
        removeControl: removeControl,
        radio: radio,
        checkbox: checkbox,
        setValue: setValue,
        ...formControl.current,
    };
}
