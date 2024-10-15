import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors }) => ({
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