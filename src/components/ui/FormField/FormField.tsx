import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import { useField } from 'formik';

import { useTheme } from '../../../hooks';

import { FormFieldProps } from './interfaces';

import themeStyles from '../../../theme/styles';
import styles from './styles';

export const FormField: FC<FormFieldProps> = ({ icon, label, style, controlStyle, inputStyle, labelStyle, name, ...rest }) => {
    const { width } = useWindowDimensions();

    const [ field, meta, helpers ] = useField({ name });

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ selection, setSelection ] = useState({
        start: String(field.value)?.length || 0,
        end: String(field.value)?.length || 0
    });

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
                style={{
                    ...styles.focusExternalBorder,
                    borderColor: (isFocused) ? '#FFFFFF' : 'transparent'
                }}
            >
                <View
                    style={{
                        ...styles.defaultBorder,
                        borderColor: (!isFocused) ? colors.text : colors.focus
                    }}
                >
                    <View
                        style={[
                            {
                                ...themeStyles.formControl,
                                ...styles.focusInternalBorder,
                                borderColor: (isFocused) ? colors.focus : 'transparent',
                            },
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
                                setIsFocused(false);
                            } }
                            onFocus={ () => setIsFocused(true) }
                        />

                        { icon }
                    </View>
                </View>
            </View>
        </View>
    );
}