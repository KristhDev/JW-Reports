import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        justifyContent: 'space-between',
        minHeight: 120,
        padding: 15,
        width: '90%'
    },

    statusContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },

    statusMsg: {
        fontSize: 19,
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'justify',
        width: '90%'
    }
});

export default styles;