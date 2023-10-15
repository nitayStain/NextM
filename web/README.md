The NextM Boilerplate

> This project is an integration of Next.js's build project with FiveM's web engine, NUI

## Usage:

> useNui hook

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

> useNuiEvent hook

```tsx
interface MyRequest {
    name: string;
};

const [data, setData] = useState<MyRequest | null>(null);
useNuiEvent<MyRequest>("setInformation", setData);

useEffect(() => {
    console.log(data);
}, [data]);
```
