import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    sectionContainer: {
        borderBottomColor: colors.header,
        borderBottomWidth: 1,
        paddingTop: margins.md,
    },

    sectionTitle: {
        color: colors.titleSecondary,
        fontSize: (fontSizes.sm - 1),
        fontWeight: 'bold',
        textAlign: 'left'
    }
}));

export default styles;