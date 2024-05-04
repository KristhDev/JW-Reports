import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { InfoTextProps } from './interfaces';

/* Styles */
import stylesheet from './styles';

/**
 * This component is responsible for displaying a help text
 * that can be used to inform or as a subtitle.
 *
 * @param {InfoTextProps} props { text: string, containerStyle: StyleProp<TextStyle>, textStyle: StyleProp<TextStyle> } - This is the props
 * for functionality of the component
 * - text: This is the text that will be displayed in the help text
 * - containerStyle: This is the style of the container that will be displayed in the help text, default is `undefined`
 * - textStyle: This is the style of the text that will be displayed in the help text, default is `undefined`
 * @return {JSX.Element} Return jsx element to render an info text
 */
export const InfoText: FC<InfoTextProps> = ({ text, containerStyle, textStyle }): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={[ styles.container, containerStyle ]}>
            <Text
                style={[ styles.text, textStyle ]}
                testID="info-text-text"
            >
                { text }
            </Text>
        </View>
    );
}