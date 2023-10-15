import axios from "axios"
import { useState } from "react";

/** 
* A react hook that sends a nui callback to the client backend and returns the response.
@example
```tsx
interface MyResponse {
name: string;
};

const { loading, invoker } = useNui<MyResponse>();
const [response, setResponse] = useState<MyResponse | null>(null);

const handleClick = async () => {
const data = await invoker();
setResponse(data);
console.log(data);
}
```
*/
export const useNui = <T = any>() => {

    // i use loading for skeleton loading or just for performance
    const [loading, setLoading] = useState(false);

    /**
     * An invoker function to send a POST request to the client backend.
     * @param endpoint - The callback event you want to invoke.
     * @param data - Custom data object you want to send.
     * @returns Typed generic response or undefined.
     */
    const invoker = async (endpoint: string, data: any) => {

        const resName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : null;
        if(!resName) return;
        setLoading(true);
        
        try {
            const response = await axios.post(`https://${resName}/${endpoint}`, data, {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })

            setLoading(false);

            return response.data as T;
        } catch {
            return;
        }
    }


    return { loading, invoker };
}

