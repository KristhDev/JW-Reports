import { createContext } from 'react';

import { Theme, ThemeState } from '../../interfaces/theme';

interface ContextProps {
    state: ThemeState;
    setTheme: (theme: Theme) => void;
    setDefaultTheme: () => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;