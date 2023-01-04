import React, { FC } from 'react';
import { Modal as ModalRN, View } from 'react-native';

import { ModalProps } from './interfaces';

import styles from './styles';

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