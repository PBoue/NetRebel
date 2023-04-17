import { FormControlValidator } from "../../useForm.types";

export const EmailValidator: FormControlValidator = async (email: string) => {
    const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(String(email).toLowerCase())) {
        return null;
    }
    return { email: true };
};
