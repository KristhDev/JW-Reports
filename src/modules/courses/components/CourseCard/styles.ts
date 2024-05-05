import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    touchable: {
        marginVertical: margins.xs,
        width: '100%'
    },

    container: {
        backgroundColor: colors.card,
        padding: margins.sm
    },

    textDate: {
        color: colors.icon,
        fontSize: 14,
        marginBottom: 15
    },

    textName: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 18
    },

    textBook: {
        color: colors.icon,
        fontSize: 16,
        marginBottom: 15
    },

    textDescription: {
        color: colors.text,
        fontSize: 16,
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
        fontSize: 18,
        paddingHorizontal: 5,
        paddingVertical: 2.5
    }
}));

export default styles;