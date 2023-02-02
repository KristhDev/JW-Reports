import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { SectionBtnProps } from './interfaces';

/**
 * This component is responsible for showing the section button that
 * occupies the entire length of the screen
 * @param {SectionBtnProps} props - { onPress, subText, text }
 */
export const SectionBtn: FC<SectionBtnProps> = ({ onPress, subText, text }) => {
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