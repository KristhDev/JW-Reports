import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonTouchable: {
        borderRadius: 50,
    },

    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
    },
});

export default styles;