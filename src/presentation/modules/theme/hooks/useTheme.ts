import { useContext } from 'react';

/* Context */
import { ThemeContext, ThemeContextProps } from '@application/context';

/**
 * A hook that returns the current theme context.
 *
 * @return {ThemeContextProps} The current theme context.
 */
const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
}

export default useTheme;