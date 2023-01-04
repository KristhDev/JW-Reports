import { createContext } from 'react';

import { Theme, ThemeState } from '../../interfaces/theme';

interface ThemeContextProps {
    state: ThemeState;
    setTheme: (theme: Theme) => void;
    setDefaultTheme: () => void;
}

const Context = createContext<ThemeContextProps>({} as ThemeContextProps);

export default Context;