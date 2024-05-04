import { useContext } from 'react';

import { ThemeContext } from '../context';

const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;