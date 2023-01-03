import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    touchable: {
        marginVertical: 10,
        maxHeight: 220,
        width: '100%'
    },

    container: {
        padding: 15,
    },

    textDate: {
        fontSize: 15,
        marginBottom: 15
    },

    textName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
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