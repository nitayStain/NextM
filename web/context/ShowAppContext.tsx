import { useNuiEvent } from "@/hooks/useNuiEvent";
import React, { createContext, useContext, useState } from "react";

interface ContextValues {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const ShowAppContext = createContext<ContextValues | null>(null);

export const useVisibility = () => useContext(ShowAppContext);

interface Props {
    children: React.ReactNode;
    eventName?: string;
    customClassName?: string;
}

/**
 * A provider component that wraps the app and decides to show or hide based on the nui event.
 */
export const ShowAppProvider = ({
    children,
    eventName,
    customClassName,
}: Props) => {
    const [visible, setVisible] = useState(false);

    useNuiEvent<boolean>(eventName ?? "setView", setVisible);

    return (
        <ShowAppContext.Provider value={{ visible, setVisible }}>
            <div className={customClassName ?? `transition-opacity opacity-0 ${visible && 'opacity-100'}`}>
                {children}
            </div>
        </ShowAppContext.Provider>
    );
}
