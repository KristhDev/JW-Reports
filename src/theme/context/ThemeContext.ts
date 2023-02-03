import { createContext } from 'react';

/* Interfaces */
import { Theme, ThemeState } from '../../interfaces/theme';

/* Defining the interface for the context. */
interface ThemeContextProps {
    state: ThemeState;
    setTheme: (theme: Theme) => void;
    setDefaultTheme: () => void;
}

/* Creating a context with the type of ThemeContextProps. */
const Context = createContext<ThemeContextProps>({} as ThemeContextProps);

export default Context;