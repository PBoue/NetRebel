import classNames from "classnames";
import React, {
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { isServer } from "@/utils";
import { Headline, HeadlineType } from "@/elements/Headline";
import { Icon, IconName } from "@/elements/Icons";
import { ModalSize } from "./Modal.types";
import "./Modal.scss";

export interface ModalProps {
    children?: ReactNode;
    title?: string;
    show?: boolean;
    size?: ModalSize;
    header?: ReactNode;
    footer?: ReactNode;
    userCanClose?: boolean;
    closeOnBackdrop?: boolean;
    showWarp?: boolean;
    noPadding?: boolean;
    onClose?: () => void;
}

let ModalCount = 0;

export const Modal: React.FC<ModalProps> = ({
    children,
    title = "",
    show = false,
    size = ModalSize.Medium,
    header = null,
    footer = null,
    userCanClose = true,
    closeOnBackdrop = true,
    showWarp = true,
    noPadding = false,
    onClose = () => {},
}) => {
    const transitionNodeRef = useRef<HTMLDivElement | null>(null),
        [hostContainer] = useState<HTMLDivElement | null>(() => {
            if (isServer()) {
                return null;
            }
            const host = document.createElement("div");
            host.classList.add("Modal__host");
            host.id = `Modal__host-${ModalCount++}`;
            return host;
        }),
        [doShow, setDoShow] = useState(show),
        tryClose = useCallback(() => {
            if (!userCanClose) {
                return;
            }
            setDoShow(false);
            onClose?.();
        }, [userCanClose]);

    //#region HOOkS

    /**
     * Appends the modal host element to the body.
     */
    useEffect(() => {
        if (!hostContainer) {
            return;
        }
        document.body.appendChild(hostContainer);
        return () => {
            document.body.removeChild(hostContainer);
        };
    }, []);

    /**
     * Binds the key event listener to the document if the modal is shown
     */
    useEffect(() => {
        if (!doShow) {
            return;
        }
        const keyEventHandler = (e: KeyboardEvent) => {
            // console.log("keyEventHandler", e);
            if (e.key === "Escape") {
                tryClose();
            }
        };
        document.addEventListener("keydown", keyEventHandler);
        // console.log("binding escape event handler");
        return () => {
            document.removeEventListener("keydown", keyEventHandler);
            // console.log("removing escape event handler");
        };
    }, [doShow, tryClose]);

    /**
     * Sync external changes of the "show" prop to update the internal state.
     */
    useEffect(() => {
        if (show !== doShow) {
            setDoShow(show);
        }
    }, [show]);

    //#endregion

    /**
     * Render function that will be passed to createPortals
     * @returns
     */
    const doRender = (): ReactElement => {
        const css = classNames({
            Modal: true,
            [`Modal--${size}`]: true,
            [`Modal--closeOnBackdrop`]: userCanClose && closeOnBackdrop,
            [`Modal--noPadding`]: noPadding,
        });
        return (
            <CSSTransition
                in={doShow}
                timeout={400}
                classNames="Modal__root"
                unmountOnExit
                nodeRef={transitionNodeRef}
            >
                <div className={css} ref={transitionNodeRef}>
                    <div
                        className="Modal__backdrop"
                        onClick={() => closeOnBackdrop && tryClose()}
                    ></div>
                    <div className="Modal__dialog">
                        <div className="Modal__header">
                            {header || (
                                <Headline type={HeadlineType.H2}>
                                    {title}
                                </Headline>
                            )}
                            {userCanClose && (
                                <button
                                    className="Modal__close"
                                    onClick={() => tryClose()}
                                >
                                    <Icon
                                        name={IconName.Edit_OffOutlineClose}
                                    ></Icon>
                                </button>
                            )}
                        </div>
                        <div className="Modal__content">{children}</div>
                        {footer && (
                            <div className="Modal__footer">{footer}</div>
                        )}
                    </div>
                </div>
            </CSSTransition>
        );
    };
    if (!hostContainer) {
        return null;
    }
    return createPortal(doRender(), hostContainer);
};
