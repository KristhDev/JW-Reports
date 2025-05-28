import { useState } from 'react';

const useAsyncAction = <Args extends any[]>(action: (...args: Args) => Promise<void>) => {
    const [ isLoading, setIsLoading ] = useState(false);

    /**
     * Execute the async action and manage the loading state
     * 
     * @param {Args} args arguments of the action
     * @return {Promise<void>} A promise that resolves when the action is completed
     */
    const excuteAsyncAction = async (...args: Args): Promise<void> => {
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