import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    btnLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: margins.lg,
    },

    defaultBorder: {
        borderRadius: 5,
        borderWidth: 0.5
    },

    fabBottomRight: {
        bottom: margins.sm,
        height: 60,
        position: 'absolute',
        right: margins.sm,
        width: 60
    },

    focusExternalBorder: {
        borderRadius: 7,
        borderWidth: 1
    },

    focusInternalBorder: {
        borderWidth: 1.5,
        paddingRight: 10
    },

    formContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },

    formControl: {
        borderColor: colors.text,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row'
    },

    formField: {
        display: 'flex',
        marginBottom: margins.sm,
        width: '100%'
    },

    formInput: {
        color: colors.inputText,
        fontSize: 17,
        paddingLeft: 10,
    },

    formInputText: {
        color: colors.inputText,
        flex: 1,
        fontSize: 17
    },

    formLabel: {
        color: colors.titleText,
        fontSize: 18,
        marginBottom: margins.sm,
    },

    formLink: {
        color: colors.linkText,
        fontSize: margins.sm
    },

    formSelectTouchableContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },

    formText: {
        color: colors.titleText,
        fontSize: margins.sm,
        marginRight: 10,
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: margins.lg,
        gap: margins.xs
    },

    modalContainer: {
        backgroundColor: colors.modal,
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: margins.md,
        width: '100%'
    },

    modalText: {
        color: colors.modalText,
        fontSize: 19,
        marginBottom: margins.sm
    },

    titleContainer: {
        paddingBottom: 0,
        paddingTop: margins.xs
    },

    titleContainerSpacingVertical: {
        paddingBottom: 60,
        paddingTop: 30
    }
}));

export default styles;