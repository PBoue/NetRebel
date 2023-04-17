import { FormControlValidator } from "../../useForm.types";

export const MinValidator =
    (min: number): FormControlValidator =>
    async (value: any) => {
        if (+value >= min) {
            return null;
        }
        return { min: true };
    };
