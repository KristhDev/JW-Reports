import React from 'react';
import { Modal as ModalRN, View } from 'react-native';

import { Props } from './interfaces';

import styles from './styles';

const Modal = ({ children, isOpen }: Props) => {
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