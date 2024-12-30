import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: colors.header,
        flexDirection: 'row',
        height: fontSizes.xxl + fontSizes.xs,
        paddingHorizontal: margins.xs,
    },

    headerTitleContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },

    headerTitle: {
        color: colors.text,
        fontSize: fontSizes.sm + 4,
        fontWeight: '500',
        marginLeft: margins.xs,
        maxWidth: '80%',
    },
}));