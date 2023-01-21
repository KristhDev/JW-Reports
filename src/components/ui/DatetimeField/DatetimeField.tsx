import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useField } from 'formik';
import dayjs from 'dayjs';

import { Button } from '../Button';

import { useTheme } from '../../../hooks';

import { DatetimeFieldProps } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const DatetimeField: FC<DatetimeFieldProps> = ({
    controlStyle,
    icon,
    inputDateFormat,
    inputStyle,
    label,
    labelStyle,
    mode,
    name,
    style,
    ...rest
}) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const [ field, meta, helpers ] = useField({ name });
    const { state: { colors } } = useTheme();

    const handleConfirm = (date: Date) => {
        setOpen(false);
        helpers.setValue(date);
    }

    const handleCancel = () => {
        setOpen(false);
        helpers.setTouched(!meta.touched);
    }

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
                    labelStyle
                ]}
            >
                { label }
            </Text>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View
                    style={[
                        { ...themeStyles.formControl, borderColor: colors.text, flex: 1 },
                        controlStyle
                    ]}
                >
                    <TextInput
                        autoCorrect={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[
                            { ...themeStyles.formInput, color: colors.inputText },
                            inputStyle
                        ]}
                        value={ dayjs(field.value).format(inputDateFormat) }
                        { ...rest }
                        editable={ false }
                    />
                </View>

                <Button
                    containerStyle={{ paddingHorizontal: 10 }}
                    icon={ icon }
                    onPress={ () => setOpen(true) }
                    text=""
                    touchableStyle={{ marginLeft: 10 }}
                />
            </View>

            <DateTimePickerModal
                accentColor={ colors.button }
                date={ field.value }
                isVisible={ open }
                mode={ mode }
                negativeButton={{ textColor: colors.button, label: 'Cancelar' }}
                onCancel={ handleCancel }
                onConfirm={ handleConfirm }
                positiveButton={{ textColor: colors.button, label: 'Seleccionar' }}
            />
        </View>
    );
}