import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors }) => ({
    mask: {
        height: 2,
        overflow: 'hidden'
    },

    dashRow: (width: number) => ({
        flexDirection: 'row',
        gap: 4,
        width: width * 2,
    }),

    dash: (width: number) => ({
        backgroundColor: colors.button,
        height: 2,
        width
    })
}))