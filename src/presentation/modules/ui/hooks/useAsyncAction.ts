import { useState } from 'react';

const useAsyncAction = <Args extends any[]>(action: (...args: Args) => Promise<void>) => {
    const [ isLoading, setIsLoading ] = useState(false);

    const excuteAsyncAction = async (...args: Args) => {
        setIsLoading(true);
        await action(...args);
        setIsLoading(false);
    }

    return { 
        isLoading, 
        excuteAsyncAction 
    }
}

export default useAsyncAction;