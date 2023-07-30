import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    touchable: {
        marginVertical: 8,
    },

    container: {
        padding: 16
    },

    textDate: {
        fontSize: 14,
        marginBottom: 15
    },

    textName: {
        fontWeight: 'bold',
        fontSize: 18
    },

    textBook: {
        fontSize: 16,
        marginBottom: 15
    },

    textDescription: {
        fontSize: 16,
    },

    fab: {
        position: 'absolute',
        right: -2.5,
        top: 5,
        height: 35,
        width: 35,
    },

    menuPosition: {
        position: 'absolute',
        right: 20,
        top: 30,
    },

    textMenuOpt: {
        fontSize: 18,
        paddingHorizontal: 5,
        paddingVertical: 2.5
    }
});

export default styles;