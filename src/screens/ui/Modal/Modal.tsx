import React, { FC } from 'react';
import { Modal as ModalRN, View } from 'react-native';

/* Interfaces */
import { ModalProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This modal is a layout for the other modals of the app.
 *
 * @param {ModalProps} { children: ReactNode, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const Modal: FC<ModalProps> = ({ children, isOpen }): JSX.Element => {
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