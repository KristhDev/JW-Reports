import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) => ({
    btnLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: margins.xl,
    },

    defaultBorder: {
        borderRadius: (borderRadius.xs - 3),
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
        borderRadius: (borderRadius.xs - 1),
        borderWidth: 1
    },

    focusInternalBorder: {
        borderWidth: 1.5,
        paddingRight: (margins.xs + 2)
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
        borderRadius: (borderRadius.xs - 3),
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
        fontSize: (fontSizes.sm + 1),
        paddingLeft: (margins.xs + 2),
    },

    formInputText: {
        color: colors.inputText,
        flex: 1,
        fontSize: (fontSizes.sm + 1)
    },

    formLabel: {
        color: colors.titleText,
        fontSize: (fontSizes.sm + 2),
        marginBottom: margins.sm,
    },

    formLink: {
        color: colors.linkText,
        fontSize: margins.sm
    },

    formSelectPressableContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: (margins.xs + 2)
    },

    formText: {
        color: colors.titleText,
        fontSize: margins.sm,
        marginRight: (margins.xs + 2)
    },

    menuButton: {
        position: 'absolute',
        right: margins.xs,
        top: margins.xs,
        height: fontSizes.lg + 3,
        width: fontSizes.lg + 3,
    },

    menuContainer: (width: number) => ({
        backgroundColor: colors.contentHeader,
        borderRadius: borderRadius.xs,
        elevation: 0,
        overflow: 'hidden',
        shadowOpacity: 0,
        width: width,
    }),

    menuItemText: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        paddingHorizontal: margins.xs,
        paddingVertical: (margins.xs / 2)
    },

    menuPosition: {
        position: 'absolute',
        right: 20,
        top: 30,
    },

    modalContainer: {
        backgroundColor: colors.modal,
        borderRadius: borderRadius.sm,
        justifyContent: 'space-between',
        padding: margins.md,
        width: '100%'
    },

    modalText: {
        color: colors.modalText,
        fontSize: (fontSizes.sm + 3),
        marginBottom: margins.sm
    },

    screenContainer: {
        alignItems: 'center',
        flex: 1,
        padding: margins.md
    },

    titleContainer: {
        paddingBottom: 0,
        paddingTop: margins.xs
    },

    titleContainerSpacingVertical: {
        paddingBottom: (margins.xxxl + 4),
        paddingTop: (margins.lg - 2)
    }
}));

export default styles;