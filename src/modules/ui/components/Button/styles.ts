import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors }) =>({
    buttonTouchable: {
        borderRadius: 10,
        backgroundColor: colors.button,
    },

    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: '100%',
        paddingHorizontal: 20,
        paddingVertical: 9
    },

    buttonText: {
        color: colors.contentHeader,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
    },
}));

export default styles;