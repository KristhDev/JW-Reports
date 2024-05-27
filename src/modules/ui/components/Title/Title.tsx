import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { TitleProps } from './interfaces';

/* Styles */
import stylesheet from './styles';

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
    const { styles } = useStyles(stylesheet);

    return (
        <View style={[ styles.titleContainer, containerStyle ]}>
            <Text
                style={[ styles.title, textStyle ]}
                testID="title-text"
            >
                { text }
            </Text>
        </View>
    );
}