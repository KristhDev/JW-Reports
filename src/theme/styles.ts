import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    btnLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    fabBottomRight: {
        bottom: 5,
        height: 60,
        position: 'absolute',
        right: 10,
        width: 60,
    },

    formContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },

    formControl: {
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row'
    },

    formField: {
        display: 'flex',
        padding: 10
    },

    formInput: {
        fontSize: 17,
        paddingLeft: 10
    },

    formLabel: {
        fontSize: 18,
        marginBottom: 5,
        padding: 5,
    },

    formLink: {
        fontSize: 16,
    },

    formText: {
        fontSize: 16,
        marginRight: 10,
    },

    titleContainer: {
        paddingBottom: 0,
        paddingTop: 30
    },

    titleContainerSpacingVertical: {
        paddingBottom: 60,
        paddingTop: 30
    }
});

export default styles;