import { createContext } from 'react';

/* Interfaces */
import { ThemeContextProps } from '../interfaces';

/* Creating a context with the type of ThemeContextProps. */
const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export default ThemeContext;