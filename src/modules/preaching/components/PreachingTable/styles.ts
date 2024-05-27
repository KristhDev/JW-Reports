import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors }) => ({
    table: {
        alignItems: 'center',
        borderColor: colors.background,
        borderWidth: 1
    },

    tableRow: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    }
}));

export default styles