import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import { useField } from 'formik';

import { useTheme } from '../../../hooks';

import { FormFieldProps } from './interfaces';

import themeStyles from '../../../theme/styles';

export const FormField: FC<FormFieldProps> = ({ icon, label, style, controlStyle, inputStyle, labelStyle, name, ...rest }) => {
    const { width } = useWindowDimensions();

    const [ selection, setSelection ] = useState({ start: 0, end: 0 });
    const [ field, meta, helpers ] = useField({ name });

    const { state: { colors } } = useTheme();

    return (
        <View
            style={{
                ...themeStyles.formField,
                width: width * 0.9,
                ...style as any
            }}
        >
            <Text
                style={[
                    { ...themeStyles.formLabel, color: colors.titleText },
                    labelStyle ]}
                >
                    { label }
            </Text>

            <View
                style={[
                    { ...themeStyles.formControl, borderColor: colors.text, paddingRight: 10 },
                    controlStyle
                ]}
            >
                <TextInput
                    autoCorrect={ false }
                    cursorColor={ colors.button }
                    onChangeText={ helpers.setValue }
                    onSelectionChange={ ({ nativeEvent }) => setSelection(nativeEvent.selection) }
                    placeholderTextColor={ colors.icon }
                    selection={ selection }
                    selectionColor={ colors.linkText }
                    style={[
                        {
                            ...themeStyles.formInput,
                            color: colors.inputText,
                            flex: 1,
                            paddingRight: 5,
                            textAlignVertical: (rest.multiline) ? 'top' : 'center',
                        },
                        inputStyle
                    ]}
                    value={ String(field.value) }
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