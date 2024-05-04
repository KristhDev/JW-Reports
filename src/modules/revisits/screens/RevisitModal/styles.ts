import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(() => ({
    container: {
        borderRadius: 10,
        padding: 15,
        width: '87%'
    },

    modalText: {
        fontSize: 19,
        marginBottom: 10,
        marginTop: 5,
        width: '90%'
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    }
}));

export default styles;