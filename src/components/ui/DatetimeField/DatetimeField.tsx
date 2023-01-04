import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useField } from 'formik';
import dayjs from 'dayjs';

import { Button } from '../Button';

import { useTheme } from '../../../hooks';

import { DatetimeFieldProps } from './interfaces';

import themeStyles from '../../../theme/styles';

export const DatetimeField: FC<DatetimeFieldProps> = ({
    controlStyle,
    icon,
    inputDateFormat,
    inputStyle,
    label,
    labelStyle,
    modalTitle,
    mode,
    name,
    style,
    ...rest
}) => {
    const [ open, setOpen ] = useState(false);
    const { width } = useWindowDimensions();

    const [ field, meta, helpers ] = useField({ name });
    const { state: { colors } } = useTheme();

    const handleConfirm = (date: Date) => {
        helpers.setValue(date);
        setOpen(false);
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

            <DatePicker
                cancelText="Cancelar"
                confirmText="Confirmar"
                date={ field.value }
                modal
                mode={ mode }
                onCancel={ handleCancel }
                onConfirm={ handleConfirm }
                open={ open }
                title={ modalTitle }
            />
        </View>
    );
}