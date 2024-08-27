import React, { useState, FC, useRef, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useField } from 'formik';

/* Interfaces */
import { FormFieldProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '../../../theme';
import { useUI } from '../../hooks';

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
    inputStyle,
    label,
    labelStyle,
    leftIcon,
    name,
    rightIcon,
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

    const { state: { isKeyboardVisible } } = useUI();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

    /**
     * Handles the blur event for the input field.
     *
     * @return {void} This function does not return anything.
     */
    const handleBlur = (): void => {
        setIsFocused(false);
        textInputRef.current?.blur();
        helpers.setTouched(!meta.touched);
    }

    useEffect(() => {
        if (!isKeyboardVisible) handleBlur();
    }, [ isKeyboardVisible ]);

    return (
        <View style={[ themeStyles.formField, style ]}>

            {/* Field label */}
            <Text
                style={[ themeStyles.formLabel, labelStyle ]}
                testID="form-field-label"
            >
                { label }
            </Text>

            <View style={ themeStyles.focusExternalBorder(isFocused) }>
                <View style={ themeStyles.defaultBorder(isFocused) }>

                    {/* Input container */}
                    <View
                        style={[
                            themeStyles.formControl,
                            themeStyles.focusInternalBorder(isFocused),
                            controlStyle
                        ]}
                    >
                        { leftIcon }

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
                                themeStyles.formInput,
                                { textAlignVertical: (rest.multiline) ? 'top' : 'center' },
                                inputStyle
                            ]}
                            value={ String(field.value) }
                            ref={ textInputRef }
                            { ...rest }
                            onBlur={ handleBlur }
                            onFocus={ () => setIsFocused(true) }
                            testID="form-field-text-input"
                        />

                        { rightIcon }
                    </View>
                </View>
            </View>
        </View>
    );
}