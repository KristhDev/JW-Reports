import React, { useState, FC  } from 'react';
import { View, Text, useWindowDimensions, TouchableHighlight } from 'react-native';
import { useField } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { OptionsModal } from '../../../screens/ui';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { FormSelectProps } from './interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for displaying a field to select a value among
 * several through a modal and then displays the value in the input.
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
 */
export const FormSelect: FC<FormSelectProps> = ({
    controlStyle,
    inputContainerStyle,
    inputTextStyle,
    items,
    label,
    labelStyle,
    name,
    placeholder,
    style,
    title
}) => {
    const { width } = useWindowDimensions();

    const [ field, meta, helpers ] = useField({ name });

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const { state: { colors } } = useTheme();

    /**
     * When the user clicks on the button, the modal will show and the input will be focused.
     */
    const handleShowModal = () => {
        setShowModal(true);
        setIsFocused(true);
    }

    /**
     * When the user clicks the button, the modal will close and the input will be marked as touched.
     */
    const handleHideModal = () => {
        helpers.setTouched(!meta.touched);
        setIsFocused(false);
        setShowModal(false);
    }

    /**
     * When the user clicks on a button, the value of the button is set to the value of the input
     * field, and the modal is hidden.
     * @param {string} value - string - the value of the input
     */
    const handleChangeValue = (value: string) => {
        helpers.setValue(value);
        handleHideModal();
    }

    return (
        <>
            <View
                style={{
                    ...themeStyles.formField,
                    width: width * 0.9,
                    ...style as any
                }}
            >

                {/* Field label */}
                <Text
                    style={[
                        { ...themeStyles.formLabel, color: colors.titleText },
                        labelStyle
                    ]}
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
                                style={{ borderRadius: 5, flex: 1 }}
                                underlayColor="transparent"
                                testID="form-select-touchable"
                            >
                                <View style={[ themeStyles.formSelectTouchableContainer, inputContainerStyle ]}>
                                    <Text
                                        style={[
                                            { ...themeStyles.formInputText, color: colors.inputText },
                                            inputTextStyle
                                        ]}
                                        testID="form-select-text-value"
                                    >
                                        { String(items.find(i => i.value === field?.value)?.label || placeholder) }
                                    </Text>

                                    <Icon
                                        name="chevron-down-outline"
                                        color={ colors.icon }
                                        size={ 25 }
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