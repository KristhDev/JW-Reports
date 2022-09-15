import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import { useField } from 'formik';

import { useTheme } from '../../../hooks';

import { Props } from './interfaces';

import styles from './styles';

export const FormField: FC<Props> = ({ icon, label, style, controlStyle, inputStyle, labelStyle, name, ...rest }) => {
    const { width } = useWindowDimensions();

    const [ selection, setSelection ] = useState({ start: 0, end: 0 });
    const [ field, meta, helpers ] = useField({ name });

    const { state: { colors } } = useTheme();

    return (
        <View
            style={{
                ...styles.formField,
                width: width * 0.9,
                ...style as any
            }}
        >
            <Text
                style={[
                    { ...styles.formLabel, color: colors.titleText },
                    labelStyle ]}
                >
                    { label }
            </Text>

            <View
                style={[
                    { ...styles.formControl, borderColor: colors.text },
                    controlStyle
                ]}
            >
                <TextInput
                    autoCorrect={ false }
                    onChangeText={ helpers.setValue }
                    onSelectionChange={ ({ nativeEvent }) => setSelection(nativeEvent.selection) }
                    placeholderTextColor={ colors.icon }
                    selection={ selection }
                    selectionColor={ colors.linkText }
                    style={[ styles.formInput, inputStyle ]}
                    value={ field.value }
                    { ...rest }
                    onBlur={ (e) => {
                        rest.onBlur && rest.onBlur(e);
                        helpers.setTouched(!meta.touched);
                    } }
                />

                { icon }
            </View>
        </View>
    );
}