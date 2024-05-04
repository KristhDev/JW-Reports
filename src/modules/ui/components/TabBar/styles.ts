import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: colors.bottom,
        flexDirection: 'row',
        height: 60,
        overflow: 'hidden',
        width: '100%'
    }
}));

export default styles;