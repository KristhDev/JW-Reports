import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) => ({
    toasterContainer: (width: number) => ({
        alignItems: 'center',
        backgroundColor: colors.contentHeader,
        borderRadius: borderRadius.xs,
        bottom: margins.xs,
        gap: margins.xs,
        justifyContent: 'center',
        marginHorizontal: margins.xs,
        minHeight: fontSizes.lg * 2,
        paddingHorizontal: margins.sm,
        paddingVertical: margins.xs + 4,
        position: 'absolute',
        width: width - margins.sm,
        zIndex: 9999,
    }),

    toasterContent: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: margins.xs,
        justifyContent: 'space-between',
        width: '100%'
    },

    toasterText: {
        color: colors.titleText,
        fontSize: fontSizes.sm,
        maxWidth: '90%'
    },

    toasterCloseButton: {
        borderRadius: borderRadius.rounded,
        overflow: 'hidden'
    },

    toasterActionsContainer: {
        flexDirection: 'row',
        gap: margins.xs,
        width: '100%'
    }
}));