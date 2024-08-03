import React, { useState, FC  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useField } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { OptionsModal } from '../../screens';

/* Interfaces */
import { FormSelectProps } from './interfaces';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

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
    inputContainerStyle,
    inputTextStyle,
    items,
    label,
    labelStyle,
    name,
    onChange,
    placeholder,
    style,
    title
}): JSX.Element => {
    const [ field, meta, helpers ] = useField({ name });

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { borderRadius, colors, fontSizes } } = useStyles(themeStylesheet);

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
        helpers.setTouched(!meta.touched);
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
        helpers.setValue(value);
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

                        {/* Field control */}
                        <View
                            style={[
                                {
                                    ...themeStyles.formControl,
                                    ...themeStyles.focusInternalBorder,
                                    paddingRight: 0,
                                    borderColor: (isFocused) ? colors.focus : 'transparent',
                                },
                                controlStyle
                            ]}
                        >

                            {/* Field input (touchable with appareance text input) */}
                            <TouchableHighlight
                                activeOpacity={ 1 }
                                onPress={ handleShowModal }
                                style={{ borderRadius: (borderRadius.xs - 3), flex: 1 }}
                                underlayColor="transparent"
                                testID="form-select-touchable"
                            >
                                <View style={[ themeStyles.formSelectPressableContainer, inputContainerStyle ]}>
                                    <Text
                                        style={[ themeStyles.formInputText, inputTextStyle ]}
                                        testID="form-select-text-value"
                                    >
                                        { String(items.find(i => i.value === field?.value)?.label || placeholder) }
                                    </Text>

                                    <Icon
                                        name="chevron-down-outline"
                                        color={ colors.icon }
                                        size={ fontSizes.icon }
                                    />
                                </View>
                            </TouchableHighlight>
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
                value={ field.value }
            />
        </>
    );
}