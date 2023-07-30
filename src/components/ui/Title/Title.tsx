import React, { FC } from 'react';
import { View, Text } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { TitleProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for render a title for screens.\
 *
 * @param {TitleProps} { text: string, containerStyle: StyleProp<TextStyle>, textStyle: StyleProp<TextStyle> } - This is
 * the props for functionality of the component
 * - text: This is the text of the title
 * - containerStyle: This is the style of the container, default is `undefined`
 * - textStyle: This is the style of the text, default is `undefined`
 * @return {JSX.Element} Return jsx element to render title of screens
 */
export const Title: FC<TitleProps> = ({ text, containerStyle, textStyle }): JSX.Element => {
    const { state: { colors } } = useTheme();

    return (
        <View style={[ styles.titleContainer, containerStyle ]}>
            <Text
                style={[
                    { ...styles.title, color: colors.titleText },
                    textStyle
                ]}
                testID="title-text"
            >
                { text }
            </Text>
        </View>
    );
}