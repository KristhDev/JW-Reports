import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { LinkProps } from './interfaces';

import { stylesheet } from './styles';

export const Link: FC<LinkProps> = ({ textStyle, children, ...props }): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <TouchableOpacity
            activeOpacity={ 0.75 }
            testID="link-touchable"
            { ...props }
        >
            <Text style={[ styles.linkText, textStyle ]}>
                { children }
            </Text>
        </TouchableOpacity>
    );
}