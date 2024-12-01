import React, { useState, FC  } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Screens */
import { OptionsModal } from '../../screens';

/* Interfaces */
import { FormSelectProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for displaying a field to select a value among
 * several through a modal and then displays the value in the input.
 *
 * @param {FormSelectProps} props {
 *      controlStyle: StyleProp<ViewStyle>,
 *      inputContainerStyle: StyleProp<ViewStyle>,
 *      inputTextStyle: StyleProp<TextStyle>,
 *      items: ItemOption[],
 *      label: string,
 *      labelStyle: StyleProp<TextStyle>,
 *      name: string,
 *      placeholder: string,
 *      style: StyleProp<ViewStyle>,
 *      title: string
 *  } - This is a props for functionality of the component
 * - controlStyle: The style of the control field
 * - inputContainerStyle: The style of the container of the input field
 * - inputTextStyle: The style of the input field
 * - items: The options of the field
 * - label: The label of the field
 * - labelStyle: The style of the label
 * - name: The name of the field
 * - placeholder: The placeholder of the field
 * - style: The style of the field
 * - title: The title of the field modal
 * @return {JSX.Element} Returns the component to show the field
 */
export const FormSelect: FC<FormSelectProps> = ({
    controlStyle,
    icon,
    inputContainerStyle,
    inputTextStyle,
    items,
    label,
    labelStyle,
    onChange,
    placeholder,
    style,
    title,
    value
}): JSX.Element => {
    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    /**
     * When the user clicks on the button, the modal will show and the input will be focused.
     *
     * @return {void} This function returns nothing
     */
    const handleShowModal = (): void => {
        setShowModal(true);
        setIsFocused(true);
    }

    /**
     * When the user clicks the button, the modal will close and the input will be marked as touched.
     *
     * @return {void} This function returns nothing
     */
    const handleHideModal = (): void => {
        setIsFocused(false);
        setShowModal(false);
    }

    /**
     * When the user clicks on a button, the value of the button is set to the value of the input
     * field, and the modal is hidden.
     *
     * @param {string} value - string - the value of the input
     * @return {void} This function returns nothing
     */
    const handleChangeValue = (value: string): void => {
        onChange && onChange(value);
        handleHideModal();
    }

    return (
        <>
            <View style={[ themeStyles.formField, style ]}>

                {/* Field label */}
                <Text
                    style={[ themeStyles.formLabel, labelStyle ]}
                    testID="form-select-label"
                >
                    { label }
                </Text>

                <View style={ themeStyles.focusExternalBorder(isFocused) }>
                    <View style={ themeStyles.defaultBorder(isFocused) }>
                        {/* Field control */}
                        <View
                            style={[
                                themeStyles.formControl,
                                themeStyles.focusInternalBorder(isFocused),
                                controlStyle
                            ]}
                        >

                            {/* Field input */}
                            <Pressable
                                onPress={ handleShowModal }
                                style={{ flex: 1 }}
                                testID="form-select-pressable"
                            >
                                <View style={[ themeStyles.formSelectPressableContainer, inputContainerStyle ]}>
                                    { icon }
                                    <TextInput
                                        autoCorrect={ false }
                                        editable={ false }
                                        placeholder={ placeholder }
                                        placeholderTextColor={ colors.icon }
                                        style={[ themeStyles.formInput, inputTextStyle ]}
                                        testID="form-select-input"
                                        value={ String(items.find(i => i.value === value)?.label || '') }
                                    />

                                    <Ionicons
                                        name="chevron-down-outline"
                                        color={ colors.icon }
                                        size={ fontSizes.icon }
                                    />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            {/* Modal to show options for select */}
            <OptionsModal
                isOpen={ showModal }
                items={ items }
                onCancel={ handleHideModal }
                onChangeValue={ handleChangeValue }
                title={ title }
                value={ value }
            />
        </>
    );
}