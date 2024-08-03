import React, { FC } from 'react';
import { KeyboardAvoidingView, Modal as ModalRN, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

/* Interfaces */
import { ModalProps } from './interfaces';

/* Styles */
import {stylesheet  } from './styles';

/**
 * This modal is a layout for the other modals of the app.
 *
 * @param {ModalProps} { children: ReactNode, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const Modal: FC<ModalProps> = ({ children, isOpen }): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { styles } = useStyles(stylesheet);

    return (
        <ModalRN
            animationType="fade"
            statusBarTranslucent
            transparent={ true }
            visible={ isOpen }
        >
            <View style={ styles.container }>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1, width: '100%' }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            alignItems: 'center',
                            flexGrow: 1,
                            justifyContent: 'center',
                            paddingVertical: top,
                            width: '100%'
                        }}
                        overScrollMode="never"
                        showsVerticalScrollIndicator={ false }
                    >
                        { children }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ModalRN>
    );
}

export default Modal;