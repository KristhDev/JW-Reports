import React, { Children, FC } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

/* Screens */
import { Modal } from '../Modal';

/* Components */
import { Button, InfoText, RadioBtn } from '../../../components/ui';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { OptionsModalProps } from './interfaces';

/* Styles */
import { styles as themeStyles } from '../../../theme';
import styles from './styles';

/**
 * This modal is responsible for displaying various options with radio buttons
 * to select one and save it where needed.
 *
 * @param {OptionsModalProps} { isOpen: boolean, items: ItemOption[], onCancel: () => void, onChangeValue: (value: string) => void, title: string, value: string } This props
 * is for config modal.
 * - isOpen: Boolean to indicate if the modal is open or closed
 * - items: Array of items to display in the modal
 * - onCancel: Function to be called when the cancel button is pressed
 * - onChangeValue: Function to be called when the value is changed
 * - title: Title of the modal
 * - value: Default value or selected value of the modal
 * @return {JSX.Element} Returns the component to show the field with radio
 */
const OptionsModal: FC<OptionsModalProps> = ({ isOpen, items, onCancel, onChangeValue, title, value }): JSX.Element => {
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
                    { Children.toArray(items.map(item => (
                        <RadioBtn
                            label={ item.label }
                            onPress={ () => onChangeValue(item.value) }
                            value={ item.value }
                        />
                    ))) }
                </RadioButton.Group>

                <View style={{ ...themeStyles.modalActions }}>

                    {/* Cancel button */}
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