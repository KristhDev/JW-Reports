import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    modalTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        fontWeight: 'bold',
        marginBottom: margins.md
    },

    modalSection: {
        marginBottom: margins.sm
    },

    modalSectionText: {
        fontSize: (fontSizes.sm + 1),
    }
}));

export default styles;