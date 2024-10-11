import React, { FC } from 'react';
import { Switch as RNSwitch } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { SwitchProps } from './interfaces';

/**
 * This component is a switch that can be used to toggle a boolean value.
 *
 * @param {{ onChange: (value: boolean) => void, value: boolean }} props
 * - onChange: A function that is called when the switch is toggled. The
 *   function is passed the new value of the switch.
 * - value: The current value of the switch.
 *
 * @return {JSX.Element} The switch component.
 */
export const Switch: FC<SwitchProps> = ({ onChange, value }): JSX.Element => {
    const { theme: { colors } } = useStyles();

    return (
        <RNSwitch
            onChange={ (e) => onChange(e.nativeEvent.value) }
            testID="switch"
            thumbColor={ value ? colors.button : colors.switchThumb }
            trackColor={{ false: colors.switchTrack, true: colors.buttonTranslucent }}
            value={ value }
        />
    );
}