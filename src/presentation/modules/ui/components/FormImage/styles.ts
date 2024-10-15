import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ margins }) => ({
    image: (height: number) => ({
        borderRadius: 5,
        height,
        width: '100%'
    }),

    actions: {
        flexDirection: 'row',
        marginTop: margins.sm,
        justifyContent: 'space-between',
        gap: margins.sm
    }
}));