import { useContext } from 'react';

/* Context */
import { ThemeContext } from '../context';
import { ThemeContextProps } from '../interfaces';

/**
 * A hook that returns the current theme context.
 *
 * @return {ThemeContextProps} The current theme context.
 */
const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
}

export default useTheme;