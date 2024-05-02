import React, { useState, FC, useRef, useEffect } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { useField } from 'formik';

/* Hooks */
import { useTheme } from '../../../theme';

/* Interfaces */
import { FormFieldProps } from './interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for displaying fields for forms of
 * different types but as long as it has to do with texts.
 *
 * @param {FormFieldProps} props {
 *      controlStyle: StyleProp<ViewStyle>,
 *      icon: ReactNode,
 *      inputStyle: StyleProp<TextStyle>,
 *      label: string,
 *      labelStyle: StyleProp<TextStyle>,
 *      name: string,
 *      style: StyleProp<ViewStyle>,
 *      ...rest
 *  } - This is a props for functionality of the component
 * - controlStyle: The style of the control field
 * - icon: The icon to be displayed on the right side of the field
 * - inputStyle: The style of the input field
 * - label: The label of the field
 * - labelStyle: The style of the label
 * - name: The name of the field
 * - style: The style of the field
 * @return {JSX.Element} Returns the component to show the field
 */
export const FormField: FC<FormFieldProps> = ({
    controlStyle,
    icon,
    inputStyle,
    label,
    labelStyle,
    name,
    style,
    ...rest
}): JSX.Element => {
    const [ field, meta, helpers ] = useField({ name });

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ selection, setSelection ] = useState({
        start: String(field.value)?.length || 0,
        end: String(field.value)?.length || 0
    });

    const textInputRef = useRef<TextInput>(null);

    const { state: { colors } } = useTheme();

    /**
     * Handles the blur event for the input field.
     *
     * @return {void} This function does not return anything.
     */
    const handleBlur = (): void => {
        setIsFocused(false);
        textInputRef.current?.blur();

        setTimeout(() => {
            helpers.setTouched(!meta.touched);
        }, 100);
    }

    useEffect(() => {
        const hideListener = Keyboard.addListener('keyboardDidHide', () => handleBlur());

        return () => {
            hideListener.remove();
        };
    }, []);

    return (
        <View
            style={{
                ...themeStyles.formField,
                ...style as any
            }}
        >

            {/* Field label */}
            <Text
                style={[
                    { ...themeStyles.formLabel, color: colors.titleText },
                    labelStyle,
                ]}
                testID="form-field-label"
            >
                { label }
            </Text>

            <View
                style={{
                    ...themeStyles.focusExternalBorder,
                    borderColor: (isFocused) ? '#FFFFFF' : 'transparent'
                }}
            >
                <View
                    style={{
                        ...themeStyles.defaultBorder,
                        borderColor: (!isFocused) ? colors.text : colors.focus
                    }}
                >

                    {/* Input container */}
                    <View
                        style={[
                            {
                                ...themeStyles.formControl,
                                ...themeStyles.focusInternalBorder,
                                borderColor: (isFocused) ? colors.focus : 'transparent',
                            },
                            controlStyle
                        ]}
                    >

                        {/* Text input */}
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
                            ref={ textInputRef }
                            { ...rest }
                            onFocus={ () => setIsFocused(true) }
                            testID="form-field-text-input"
                            onBlur={ () => {
                                setIsFocused(false);
                                helpers.setTouched(!meta.touched);
                            } }
                        />

                        { icon }
                    </View>
                </View>
            </View>
        </View>
    );
}