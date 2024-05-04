import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    sectionContainer: {
        borderBottomColor: colors.header,
        borderBottomWidth: 1,
        paddingTop: margins.md,
    },

    sectionTitle: {
        color: colors.titleSecondary,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left'
    }
}));

export default styles;