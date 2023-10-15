import { MutableRefObject, useEffect, useRef } from "react";

interface NuiRequest<T = unknown> {
    action: string;
    data: T;
}

type NuiHandler<T> = (data: T) => void;

/**
 * The function that has been used in https://github.com/Varkaria/fivem-react-tailwind-boilerplate-lua/blob/master/web/src/hooks/useNuiEvent.ts
 */
export const useNuiEvent = <T = any>( action: string, handler: (data: T) => void) => {
    const handlerRef: MutableRefObject<NuiHandler<T>> = useRef(() => {});

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: MessageEvent<NuiRequest<T>>) => {
            const { action: _action, data } = event.data;

            if(handlerRef.current) {
                if(_action === action) {
                    handlerRef.current(data);
                }
            }
        };

        window.addEventListener("message", listener);

        return () => window.removeEventListener("message", listener);
    }, [action]);
}