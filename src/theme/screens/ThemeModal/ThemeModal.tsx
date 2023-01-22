import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { Modal } from '../../../screens/ui';

import { Button, InfoText } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { Theme } from '../../../interfaces/theme';
import { ModalProps } from '../../../interfaces/ui';

import { styles as themeStyles } from '../../';
import styles from './styles';

const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const { state: { colors, theme }, setTheme, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    return (
        <Modal isOpen={ isOpen }>
            <View
                style={{
                    ...themeStyles.modalContainer,
                    backgroundColor: colors.modal
                }}
            >
                <InfoText
                    text="Apariencia"
                    textStyle={{ ...styles.modalTitle, color: colors.text }}
                    containerStyle={ styles.modalTitleContainer }
                />

                <RadioButton.Group onValueChange={ (value) => setTheme(value as Theme) } value={ theme }>
                    <View style={ styles.radioContainer }>
                        <RadioButton
                            value="default"
                            color={ colors.button }
                            uncheckedColor={ colors.icon }
                        />

                        <Text
                            onPress={ () => setTheme('default') }
                            style={{ ...styles.radioLabel, color: colors.text }}
                        >
                            Modo predeterminado
                        </Text>
                    </View>

                    <View style={ styles.radioContainer }>
                        <RadioButton
                            value="light"
                            color={ colors.button }
                            uncheckedColor={ colors.icon }
                        />

                        <Text
                            onPress={ () => setTheme('light') }
                            style={{ ...styles.radioLabel, color: colors.text }}
                        >
                            Modo claro
                        </Text>
                    </View>

                    <View style={ styles.radioContainer }>
                        <RadioButton
                            value="dark"
                            color={ colors.button }
                            uncheckedColor={ colors.icon }
                        />

                        <Text
                            onPress={ () => setTheme('dark') }
                            style={{ ...styles.radioLabel, color: colors.text }}
                        >
                            Modo oscuro
                        </Text>
                    </View>

                    <View style={{ ...themeStyles.modalActions }}>
                        <Button
                            containerStyle={{ paddingHorizontal: 12 }}
                            onPress={ onClose }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                            underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                        />
                    </View>
                </RadioButton.Group>
            </View>
        </Modal>
    );
}

export default ThemeModal;