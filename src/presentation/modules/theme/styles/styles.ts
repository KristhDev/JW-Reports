import { createStyleSheet } from 'react-native-unistyles';

export const themeStylesheet = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) => ({
    btnLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: margins.xl,
    },

    createdAtContainer: {
        alignItems: 'flex-end',
        flex: 1,
        marginTop: margins.md * 2,
        width: '100%'
    },

    createdAtText: {
        color: colors.modalText,
        fontSize: fontSizes.sm
    },

    defaultBorder: (isFocused: boolean) => ({
        borderColor: (!isFocused) ? colors.text : colors.focus,
        borderRadius: (borderRadius.xs - 3),
        borderWidth: 0.5,
    }),

    detailSection: {
        marginBottom: margins.lg,
        width: '100%'
    },

    detailSubTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3),
        fontWeight: 'bold',
        marginBottom: margins.sm
    },

    detailText: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3)
    },

    fabBottomRight: {
        bottom: margins.sm,
        height: 60,
        position: 'absolute',
        right: margins.sm,
        width: 60
    },

    focusExternalBorder: (isFocused: boolean) => ({
        borderColor: (isFocused) ? '#FFFFFF' : 'transparent',
        borderRadius: (borderRadius.xs - 1),
        borderWidth: 1,
    }),

    focusInternalBorder: (isFocused: boolean) => ({
        borderColor: (isFocused) ? colors.focus : 'transparent',
        borderWidth: 1.5
    }),

    formContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },

    formControl: {
        alignItems: 'center',
        borderColor: colors.text,
        borderRadius: (borderRadius.xs - 3),
        borderWidth: 0.5,
        flexDirection: 'row',
        gap: (margins.xs - 2),
        paddingHorizontal: (margins.xs + 2),
    },

    formField: {
        display: 'flex',
        marginBottom: margins.sm,
        width: '100%'
    },

    formInput: {
        color: colors.inputText,
        flex: 1,
        fontSize: (fontSizes.sm + 1),
    },

    formInputBtn: {
        height: 50,
        minWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: 50
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

    formSelectPressableContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        gap: margins.xs - 2,
    },

    formText: {
        color: colors.titleText,
        fontSize: margins.sm,
        marginRight: (margins.xs + 2)
    },

    flatListContainer: {
        alignItems: 'center',
        flexGrow: 1,
        padding: margins.md,
        paddingBottom: 100
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

    publicationTextContainer: {
        padding: 0,
        paddingBottom: margins.md,
        width: '100%'
    },

    publicationText: {
        fontSize: fontSizes.sm,
        fontWeight: 'bold',
        textAlign: 'left'
    },

    sectionTextSize: {
        fontSize: (fontSizes.sm + 3)
    },

    screenContainer: {
        alignItems: 'center',
        flex: 1,
        padding: margins.md
    },

    scrollView: {
        alignItems: 'center',
        flexGrow: 1,
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