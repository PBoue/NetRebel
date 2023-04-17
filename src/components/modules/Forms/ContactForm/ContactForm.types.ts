import { DropdownOption } from "../../dropdown/Dropdown.types";

export interface ContactFormData {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    acceptPrivacyPolicy?: boolean;
}
