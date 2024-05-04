import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors }) => ({
    tableCell: {
        backgroundColor: '#3C3547',
        borderColor: colors.background,
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
    },

    tableCellText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10
    }
}));

export default styles;
