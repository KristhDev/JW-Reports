import React, { useState, FC } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useField } from 'formik';
import dayjs from 'dayjs';

import { useTheme } from '../../../hooks';

import { Button } from '../Button';

import { Props } from './interfaces';

import styles from './styles';

export const DatetimeField: FC<Props> = ({ icon, modalTitle, label, inputDateFormat, mode, style, controlStyle, inputStyle, labelStyle, name, ...rest }) => {
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
                ...styles.datetimeField,
                width: width * 0.9,
                ...style as any
            }}
        >
            <Text
                style={[
                    { ...styles.formLabel, color: colors.titleText },
                    labelStyle
                ]}
            >
                { label }
            </Text>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <View
                    style={[
                        { ...styles.formControl, borderColor: colors.text },
                        controlStyle
                    ]}
                >
                    <TextInput
                        autoCorrect={ false }
                        placeholderTextColor={ colors.icon }
                        selectionColor={ colors.linkText }
                        style={[
                            { ...styles.formInput, color: colors.inputText },
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