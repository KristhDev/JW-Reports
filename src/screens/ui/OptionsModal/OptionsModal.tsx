import React, { Children, FC } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { Modal } from '../Modal';

import { Button, InfoText, RadioBtn } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { OptionsModalProps } from './interfaces';

import { styles as themeStyles } from '../../../theme';
import styles from './styles';

const OptionsModal: FC<OptionsModalProps> = ({ isOpen, items, onCancel, onChangeValue, title, value }) => {
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();
    return (
        <Modal isOpen={ isOpen }>
            <View
                style={{
                    ...themeStyles.modalContainer,
                    backgroundColor: colors.modal
                }}
            >
                <InfoText
                    text={ title }
                    textStyle={{ ...styles.modalTitle, color: colors.text }}
                    containerStyle={ styles.modalTitleContainer }
                />

                <RadioButton.Group onValueChange={ onChangeValue } value={ value }>
                    {
                        Children.toArray(items.map(item => (
                            <RadioBtn
                                label={ item.label }
                                onPress={ () => onChangeValue(item.value) }
                                value={ item.value }
                            />
                        )))
                    }
                </RadioButton.Group>

                <View style={{ ...themeStyles.modalActions }}>
                    <Button
                        containerStyle={{ paddingHorizontal: 12 }}
                        onPress={ onCancel }
                        text="CANCELAR"
                        textStyle={{ color: colors.button, fontSize: 16 }}
                        touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default OptionsModal;