import { useContext } from 'react';
import ThemeContext from '../theme/context/ThemeContext';

const useTheme = () => useContext(ThemeContext);

export default useTheme;