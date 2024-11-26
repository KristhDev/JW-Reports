import React, { useState, FC, useRef, useEffect } from 'react';
import { View, Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Hooks */
import { useUI } from '../../hooks';

/* Interfaces */
import { FormFieldProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

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
    onChangeText,
    rightIcon,
    style,
    value,
    ...rest
}): JSX.Element => {
    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ selection, setSelection ] = useState({
        start: value.length,
        end: value.length
    });

    const textInputRef = useRef<TextInput>(null);

    const { state: { keyboard } } = useUI();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

    /**
     * Handles the focus event of the form field by setting the `isFocused` state
     * to `true`, calling the `onFocus` prop if it exists, and setting the focus
     * to the text input field if it has been assigned to the `textInputRef` ref.
     * @param {NativeSyntheticEvent<TextInputFocusEventData>} e - The focus event
     * @return {void} - Returns nothing
     */
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
        setIsFocused(true);
        rest.onFocus && rest.onFocus(e);
        textInputRef.current?.focus();
    }

    /**
     * Sets the `isFocused` state to `false`, removes focus from the text
     * input field, and calls the `onBlur` prop if it exists. Also, it
     * sets the `touched` state to `true` if the field has not been touched
     * before.
     *
     * @param {NativeSyntheticEvent<TextInputFocusEventData>} e - The event
     *  that triggered the blur
     * @return {void} This function does not return anything.
     */
    const handleBlur = (e?: NativeSyntheticEvent<TextInputFocusEventData>): void => {
        setIsFocused(false);
        textInputRef.current?.blur();
        rest.onBlur && e && rest.onBlur(e);
    }

    useEffect(() => {
        if (!keyboard.isVisible) handleBlur();
    }, [ keyboard.isVisible ]);

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
                            onChangeText={ onChangeText }
                            onSelectionChange={ ({ nativeEvent }) => setSelection(nativeEvent.selection) }
                            placeholderTextColor={ colors.icon }
                            selection={ selection }
                            selectionColor={ colors.linkText }
                            style={[
                                themeStyles.formInput,
                                { textAlignVertical: (rest.multiline) ? 'top' : 'center' },
                                inputStyle
                            ]}
                            value={ value }
                            ref={ textInputRef }
                            { ...rest }
                            onBlur={ handleBlur }
                            onFocus={ handleFocus }
                            testID="form-field-text-input"
                        />

                        { rightIcon }
                    </View>
                </View>
            </View>
        </View>
    );
}