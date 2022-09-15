
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formField: {
        display: 'flex',
        padding: 10
    },

    formLabel: {
        fontSize: 18,
        marginBottom: 5,
        padding: 5
    },

    formControl: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    formInput: {
        fontSize: 17,
        marginBottom: 1,
        paddingLeft: 10,
        width: '87%'
    },
});

export default styles;