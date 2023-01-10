import { useContext } from 'react';
import { Appearance } from 'react-native';
import hexToRgba from 'hex-to-rgba';

import { ThemeContext } from '../theme/context';

const useTheme = () => {
    const BUTTON_TRANSLUCENT_COLOR = hexToRgba(
        (Appearance.getColorScheme() === 'dark') ? '#5A3D86' : '#C0A7E1',
        (Appearance.getColorScheme() === 'dark') ? 0.25 : 0.50
    );

    const BUTTON_TRANSPARENT_COLOR = (Appearance.getColorScheme() === 'dark')
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)';

    return {
        ...useContext(ThemeContext),
        BUTTON_TRANSLUCENT_COLOR,
        BUTTON_TRANSPARENT_COLOR
    }
};

export default useTheme;