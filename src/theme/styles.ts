import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    btnLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },

    defaultBorder: {
        borderRadius: 5,
        borderWidth: 0.5
    },

    fabBottomRight: {
        bottom: 5,
        height: 60,
        position: 'absolute',
        right: 10,
        width: 60,
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
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row'
    },

    formField: {
        display: 'flex',
        marginBottom: 16,
        width: '100%'
    },

    formInput: {
        fontSize: 17,
        paddingLeft: 10,
    },

    formInputText: {
        flex: 1,
        fontSize: 17
    },

    formLabel: {
        fontSize: 18,
        marginBottom: 16,
    },

    formLink: {
        fontSize: 16,
    },

    formSelectTouchableContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },

    formText: {
        fontSize: 16,
        marginRight: 10,
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 40
    },

    modalContainer: {
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: 24
    },

    modalText: {
        fontSize: 19,
        marginBottom: 16
    },

    titleContainer: {
        paddingBottom: 0,
        paddingTop: 8
    },

    titleContainerSpacingVertical: {
        paddingBottom: 60,
        paddingTop: 30
    }
});

export default styles;