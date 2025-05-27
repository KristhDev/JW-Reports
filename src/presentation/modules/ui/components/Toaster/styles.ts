import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) => ({
    toasterContainer: (width: number) => ({
        alignItems: 'center',
        backgroundColor: colors.contentHeader,
        borderRadius: borderRadius.xs,
        bottom: margins.xs,
        flexDirection: 'row',
        gap: margins.xs,
        justifyContent: 'space-between',
        marginHorizontal: margins.xs,
        minHeight: fontSizes.lg * 2,
        paddingHorizontal: margins.sm,
        position: 'absolute',
        width: width - margins.sm,
        zIndex: 9999,
    }),

    toasterText: {
        color: colors.titleText,
        fontSize: fontSizes.sm
    },

    toasterCloseButton: {
        borderRadius: borderRadius.rounded,
        overflow: 'hidden'
    }
}));