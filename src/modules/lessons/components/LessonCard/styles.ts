import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    touchable: {
        marginVertical: margins.xs,
    },

    container: {
        backgroundColor: colors.card,
        padding: margins.sm
    },

    textDate: {
        color: colors.icon,
        fontSize: (fontSizes.sm - 2),
        marginBottom: margins.sm
    },

    textDescription: {
        color: colors.text,
        fontSize: fontSizes.sm,
    },

    fab: {
        position: 'absolute',
        right: margins.xs,
        top: margins.xs,
        height: 35,
        width: 35,
    },

    menuPosition: {
        position: 'absolute',
        right: 20,
        top: 30,
    },

    textMenuOpt: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        paddingHorizontal: 5,
        paddingVertical: 2.5
    }
}));

export default styles;