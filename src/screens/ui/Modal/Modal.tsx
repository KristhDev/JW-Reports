import React, { FC } from 'react';
import { Modal as ModalRN, View } from 'react-native';

/* Interfaces */
import { ModalProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This modal is a layout for the other modals of the app.
 * @param {ModalProps} { children: ReactNode, isOpen: boolean }
 */
const Modal: FC<ModalProps> = ({ children, isOpen }) => {
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