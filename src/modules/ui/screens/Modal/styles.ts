import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ margins }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        paddingHorizontal: margins.md,
        justifyContent: 'center',
        zIndex: 999
    }
}));

export default styles;