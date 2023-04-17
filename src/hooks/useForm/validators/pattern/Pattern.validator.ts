import { FormControlValidator } from "../../useForm.types";

export const PatternValidator =
    (pattern: RegExp): FormControlValidator =>
    async (value: any) => {
        if (pattern.test(value)) {
            return null;
        }
        return { pattern: true };
    };
