import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    tableCell: {
        backgroundColor: colors.tableHeader,
        borderColor: colors.background,
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
    },

    tableCellText: {
        color: colors.white,
        fontSize: fontSizes.sm,
        marginLeft: (margins.xs + 2)
    }
}));
