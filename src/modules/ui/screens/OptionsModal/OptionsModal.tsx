import React, { Children, FC } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { RadioButton } from 'react-native-paper';

/* Screens */
import { Modal } from '../Modal';

/* Components */
import { Button, InfoText, RadioBtn } from '../../components';

/* Interfaces */
import { OptionsModalProps } from './interfaces';

/* Styles */
import { styles as themeStylesheet } from '../../../theme';
import stylesheet from './styles';

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
    const { styles: themeStyles, theme: { colors, } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    return (
        <Modal isOpen={ isOpen }>
            <View style={ themeStyles.modalContainer }>
                <InfoText
                    text={ title }
                    textStyle={ styles.modalTitle }
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

                <View style={ themeStyles.modalActions }>

                    {/* Cancel button */}
                    <Button
                        containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                        onPress={ onCancel }
                        text="CANCELAR"
                        textStyle={{ color: colors.button, fontSize: 16 }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ colors.buttonTranslucent }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default OptionsModal;