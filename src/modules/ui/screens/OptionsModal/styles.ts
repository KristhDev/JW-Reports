import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    modalTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },

    modalTitleContainer: {
        marginBottom: margins.md,
        padding: 0
    }
}));

export default styles;