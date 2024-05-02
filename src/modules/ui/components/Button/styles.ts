import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonTouchable: {
        borderRadius: 10
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
    },
});

export default styles;