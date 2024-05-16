import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    modalTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 4),
        fontWeight: 'bold',
        textAlign: 'left'
    },

    modalTitleContainer: {
        marginBottom: margins.md,
        padding: 0
    }
}));

export default styles;