import { useContext } from 'react';
import hexToRgba from 'hex-to-rgba';

/* Theme */
import { ThemeContext, ThemeContextProps } from '../theme';

/**
 * Returns the theme context and additional color values.
 *
 * @return {ThemeContextProps & { BUTTON_TRANSLUCENT_COLOR: string, BUTTON_TRANSPARENT_COLOR: string }} The theme context and additional color values.
 */
const useTheme = (): ThemeContextProps & { BUTTON_TRANSLUCENT_COLOR: string, BUTTON_TRANSPARENT_COLOR: string } => {
    const context = useContext(ThemeContext);

    const BUTTON_TRANSLUCENT_COLOR = hexToRgba(
        (context.state.selectedTheme === 'dark') ? '#5A3D86' : '#C0A7E1',
        (context.state.selectedTheme === 'dark') ? 0.25 : 0.50
    );

    const BUTTON_TRANSPARENT_COLOR = (context.state.selectedTheme === 'dark')
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)';

    return {
        ...context,
        BUTTON_TRANSLUCENT_COLOR,
        BUTTON_TRANSPARENT_COLOR
    }
}

export default useTheme;