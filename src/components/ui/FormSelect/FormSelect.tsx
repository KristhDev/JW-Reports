import React, { useState, FC  } from 'react';
import { View, Text, useWindowDimensions, TouchableHighlight } from 'react-native';
import { useField } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { OptionsModal } from '../../../screens/ui';

import { useTheme } from '../../../hooks';

import { FormSelectProps } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const FormSelect: FC<FormSelectProps> = ({
    controlStyle,
    inputContainerStyle,
    inputTextStyle,
    items,
    label,
    labelStyle,
    name,
    placeholder,
    style
}) => {
    const { width } = useWindowDimensions();

    const [ field, meta, helpers ] = useField({ name });

    const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const { state: { colors } } = useTheme();

    const handleShowModal = () => {
        setShowModal(true);
        setIsFocused(true);
    }

    const handleHideModal = () => {
        helpers.setTouched(!meta.touched);
        setIsFocused(false);
        setShowModal(false);
    }

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
                <Text
                    style={[
                        { ...themeStyles.formLabel, color: colors.titleText },
                        labelStyle
                    ]}
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
                            <TouchableHighlight
                                activeOpacity={ 1 }
                                onPress={ handleShowModal }
                                style={{ borderRadius: 5, flex: 1 }}
                                underlayColor="transparent"
                            >
                                <View style={[ themeStyles.formSelectTouchableContainer, inputContainerStyle ]}>
                                    <Text
                                        style={[
                                            { ...themeStyles.formInputText, color: colors.inputText },
                                            inputTextStyle
                                        ]}
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

            <OptionsModal
                isOpen={ showModal }
                items={ items }
                onCancel={ handleHideModal }
                onChangeValue={ handleChangeValue }
                title="Seleccione su precursorado"
                value={ field.value }
            />
        </>
    );
}