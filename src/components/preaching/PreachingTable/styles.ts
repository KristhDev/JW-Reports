import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    tableRow: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },

    tableBox: {
        backgroundColor: '#3C3547',
        borderWidth: 1,
        flex: 1,
        height: 50,
        justifyContent: 'center'
    },

    tableBoxTotal: {
        alignItems: 'center',
        flex: 3.08,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    tableBoxText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 10
    }
});

export default styles