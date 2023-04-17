import { FormControlValidator } from "../../useForm.types";

export const RequiredValidator: FormControlValidator = async (value: any) => {
    return (value || "").length > 0 ? null : { required: true };
};
