import { useContext } from 'react';

/* Context */
import { ThemeContext } from '../context';

/**
 * A hook that returns the current theme context.
 *
 * @return {ThemeContext} The current theme context.
 */
const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;