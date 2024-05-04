import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(() => ({
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },

    modalTitleContainer: {
        marginBottom: 10,
        marginLeft: 5,
        padding: 0
    },

    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5
    },

    radioLabel: {
        fontSize: 18,
        marginLeft: 15
    }
}));

export default styles;