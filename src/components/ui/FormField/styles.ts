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
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row',
        paddingRight: 10
    },

    formInput: {
        flex: 1,
        fontSize: 17,
        marginBottom: 1,
        paddingLeft: 10,
        paddingRight: 5
    },
});

export default styles;