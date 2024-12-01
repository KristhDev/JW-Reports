import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: colors.header,
        flexDirection: 'row',
        height: fontSizes.xxl + fontSizes.xs,
        paddingLeft: margins.xs,
    },

    headerTitle: {
        color: colors.text,
        fontSize: fontSizes.sm + 4,
        fontWeight: '500',
        marginLeft: margins.xs,
    }
}));