import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { useTheme } from '../../../hooks';

import { SectionButtonProps } from './interfaces';

export const SectionButton: FC<SectionButtonProps> = ({ onPress, subText, text }) => {
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    return (
        <TouchableRipple
            onPress={ onPress }
            centered
            borderless
            style={{ paddingHorizontal: 18, paddingVertical: 16 }}
            rippleColor={ BUTTON_TRANSPARENT_COLOR }
        >
            <View>
                <Text style={{ color: colors.text, fontSize: 16 }}>{ text }</Text>
                <Text style={{ color: colors.icon, fontSize: 14 }}>{ subText }</Text>
            </View>
        </TouchableRipple>
    );
}