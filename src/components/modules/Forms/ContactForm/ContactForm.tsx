"use client"

import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { 
    Headline, 
    HeadlineType, 
    Button, 
    ButtonColor, 
    Logo,    
    Checkbox,
    Dropdown,
    DropdownOption,
    FormField,
    FormFieldError,
    Textarea,
    Textfield
} from "@/elements/index";

import { 
    Modal, 
    ModalSize,
    ContactFormData
} from "@/modules/index";

import { 
    useForm, 
    EmailValidator, 
    RequiredValidator 
} from '@/hooks'

import "./ContactForm.scss";

const DefaultSubjects = [
    { label: "Generelles", value: "generelles" },
    { label: "Services", value: "services" },
    { label: "Jobs", value: "jobs" },
];
export interface ContactFormProps {
    title?: string;
    showLogo?: boolean;
    inverted?: boolean;
    contactSubjects?: DropdownOption[];
    nameLabel?: string;
    emailLabel?: string;
    subjectLabel?: string;
    textareaLabel?: string;
    privacyPolicyLabel?: ReactNode;
    openModalButtonLabel?: string;
    submitButtonLabel?: string;
    onSubmitForm?: (data: ContactFormData) => Promise<boolean>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    showLogo = true,
    inverted,
    contactSubjects = [...DefaultSubjects],
    subjectLabel = "Thema",
    nameLabel = "Name",
    emailLabel = "E-Mail",
    title = "Kontakt aufnehmen",
    openModalButtonLabel = "Schreib uns",
    textareaLabel = "Nachricht",
    submitButtonLabel = "Abschicken",
    privacyPolicyLabel = "Ich habe die Datenschutzbestimmungen gelesen und stimme diesen zu.",
    onSubmitForm = async () => true,
}) => {
    const { onSubmit, addControl, checkbox, controls, formState, setValue } =
            useForm<ContactFormData>({
                subject: contactSubjects
                    ? (contactSubjects[0].value as string)
                    : "",
            }),
        [showMessageModal, setShowMessageModal] = useState(false),
        css = classNames({
            ContactForm: true,
            "ContactForm--inverted": inverted,
        }),
        resetForm = () => {
            setValue("name", "");
            setValue("email", "");
            setValue("message", "");
            setValue(
                "subject",
                contactSubjects ? (contactSubjects[0].value as string) : ""
            );
            setValue("acceptPrivacyPolicy", false);
        },
        handleOnSubmit = async (data: ContactFormData) => {
            const closeModal = await onSubmitForm(data);
            setShowMessageModal(!closeModal);
            if (closeModal) {
                resetForm();
            }
        },
        renderFormFields = (invertedLabel = inverted) => {
            return (
                <div className="ContactForm__inputSection">
                    <FormField
                        label={nameLabel}
                        inverted={invertedLabel}
                        errorMessages={controls.name?.errorMessages}
                    >
                        <Textfield
                            placeholder={nameLabel}
                            inverted={invertedLabel}
                            {...addControl("name", {
                                validators: {
                                    required: [
                                        RequiredValidator,
                                        "Name ist ein Pflichtfeld.",
                                    ],
                                    required2: [
                                        RequiredValidator,
                                        "Bitte gib Deinen Namen ein.",
                                    ],
                                },
                            })}
                        />
                    </FormField>
                    <FormField
                        label={emailLabel}
                        inverted={invertedLabel}
                        errorMessages={controls.email?.errorMessages}
                    >
                        <Textfield
                            inverted={invertedLabel}
                            placeholder={emailLabel}
                            {...addControl("email", {
                                validators: {
                                    required: [
                                        RequiredValidator,
                                        "E-Mail ist ein Pflichtfeld.",
                                    ],
                                    email: [
                                        EmailValidator,
                                        "Bitte trage eine gültige E-Mail-Adresse ein.",
                                    ],
                                },
                            })}
                        />
                    </FormField>
                </div>
            );
        };

    const privacyControl = checkbox("acceptPrivacyPolicy", {
        validators: {
            required: [
                RequiredValidator,
                "Bitte bestätige, dass Du die Datenschutzbestimmungen gelesen hast und diesen zustimmst.",
            ],
        },
    });

    return (
        <div className={css}>
            {showLogo && (
                <div className="ContactForm__logo">
                    <Logo inverted={inverted} />
                </div>
            )}
            <div className="ContactForm__content">
                <div className="ContactForm__titleSection">
                    <Headline type={HeadlineType.H2}>{title}</Headline>
                </div>
                {renderFormFields()}
                <div className="ContactForm__writeMessageSection">
                    <Button
                        onClick={() => setShowMessageModal(true)}
                        color={
                            inverted ? ButtonColor.Magenta : ButtonColor.Blue
                        }
                    >
                        {openModalButtonLabel}
                    </Button>
                </div>
            </div>
            <Modal
                size={ModalSize.Large}
                show={showMessageModal}
                title={title}
                onClose={() => setShowMessageModal(false)}
            >
                <div className="ContactForm__modal">
                    <form onSubmit={onSubmit(handleOnSubmit)}>
                        {renderFormFields(true)}
                        <div className="ContactForm__inputSection">
                            <FormField label={subjectLabel} inverted={true}>
                                <Dropdown
                                    inverted={true}
                                    options={contactSubjects}
                                    {...addControl("subject")}
                                />
                            </FormField>
                            <FormField
                                label={textareaLabel}
                                inverted={true}
                                errorMessages={controls.message?.errorMessages}
                            >
                                <Textarea
                                    inverted={true}
                                    {...addControl("message", {
                                        validators: {
                                            required: [
                                                RequiredValidator,
                                                "Nachricht ist ein Pflichtfeld.",
                                            ],
                                            required2: [
                                                RequiredValidator,
                                                "Bitte schreibe uns eine kurze Nachricht.",
                                            ],
                                        },
                                    })}
                                ></Textarea>
                            </FormField>

                            <FormField useLabelTag={false} inverted={true}>
                                <Checkbox
                                    {...privacyControl.add("accept")}
                                    inverted={true}
                                >
                                    {privacyPolicyLabel}
                                </Checkbox>
                                {(
                                    controls.acceptPrivacyPolicy
                                        ?.errorMessages || []
                                ).map((message) => {
                                    return (
                                        <FormFieldError key={message}>
                                            {message}
                                        </FormFieldError>
                                    );
                                })}
                            </FormField>
                            <Button
                                type="submit"
                                color={ButtonColor.Magenta}
                                disabled={formState.isSubmitting}
                            >
                                {submitButtonLabel}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
