import React, { FC } from 'react';
import { Modal as ModalRN, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { ModalProps } from './interfaces';

/* Styles */
import stylesheet from './styles';

/**
 * This modal is a layout for the other modals of the app.
 *
 * @param {ModalProps} { children: ReactNode, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const Modal: FC<ModalProps> = ({ children, isOpen }): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    return (
        <ModalRN
            animationType="fade"
            statusBarTranslucent
            transparent={ true }
            visible={ isOpen }
        >
            <View style={ styles.container }>
                { children }
            </View>
        </ModalRN>
    );
}

export default Modal;