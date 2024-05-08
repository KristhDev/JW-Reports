import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    tableCell: {
        backgroundColor: '#3C3547',
        borderColor: colors.background,
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
    },

    tableCellText: {
        color: '#FFFFFF',
        fontSize: fontSizes.sm,
        marginLeft: (margins.xs + 2)
    }
}));

export default styles;
