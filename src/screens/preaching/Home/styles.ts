import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    titleContainerStyle: {
        paddingBottom: 0,
        paddingTop: 30
    },

    fab: {
        bottom: 5,
        height: 60,
        position: 'absolute',
        right: 10,
        width: 60,
    },

    container: {
        borderRadius: 10,
        justifyContent: 'space-between',
        minHeight: 120,
        padding: 15,
        width: '90%'
    }
});

export default styles;