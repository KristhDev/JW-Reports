import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { InfoTextProps } from './interfaces';

import styles from './styles';

export const InfoText: FC<InfoTextProps> = ({ text, containerStyle, textStyle }) => {
    return (
        <View style={[ styles.container, containerStyle ]}>
            <Text style={[ styles.text, textStyle ]}>{ text }</Text>
        </View>
    );
}