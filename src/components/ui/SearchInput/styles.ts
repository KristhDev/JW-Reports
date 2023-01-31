import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        paddingHorizontal: 30,
    },

    inputContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
    },

    cleanBtn: {
        alignItems: 'center',
        borderRadius: 999,
        height: 40,
        justifyContent: 'center',
        width: 40
    }
});

export default styles;