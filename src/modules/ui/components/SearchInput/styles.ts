import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ margins }) => ({
    searchInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: margins.md,
        paddingHorizontal: margins.xs,
        width: '100%'
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
        height: margins.lg,
        justifyContent: 'center',
        width: margins.lg
    }
}));

export default styles;