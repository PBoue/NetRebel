import { FormControlValidator } from "../../useForm.types";

export const MaxValidator =
    (max: number): FormControlValidator =>
    async (value: any) => {
        if (+value <= max) {
            return null;
        }
        return { max: true };
    };
