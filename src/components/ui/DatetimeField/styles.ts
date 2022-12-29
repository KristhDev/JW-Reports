import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    datetimeField: {
        display: 'flex',
        padding: 10
    },

    formLabel: {
        fontSize: 18,
        marginBottom: 5,
        padding: 5
    },

    formControl: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row'
    },

    formInput: {
        fontSize: 17,
        marginBottom: 1,
        paddingLeft: 10
    },
});

export default styles;