import React from 'react';
import { Linking, Text, View } from 'react-native';

import { Modal } from '../../ui';

import { Button } from '../../../components/ui';

import { useStatus, useTheme } from '../../../hooks';

import styles from './styles';

const StatusModal = () => {
    const { state: { msg }, clearStatus } = useStatus();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const configMsg = 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación';

    const btnText = (msg === configMsg)
        ? 'Configuración'
        : 'Está bien';

    const handleClose = () => {
        clearStatus();
        if (msg === configMsg) Linking.openSettings();
    }

    return (
        <Modal isOpen={ !!msg }>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: colors.header,
                }}
            >
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Text
                        style={{
                            ...styles.statusMsg,
                            color: colors.modalText
                        }}>
                            { msg }
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                        onPress={ handleClose }
                        text={ btnText }
                        textStyle={{ color: colors.button }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />

                    {
                        (msg === configMsg) && (
                            <Button
                                containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                onPress={ clearStatus }
                                text="Cancelar"
                                textStyle={{ color: colors.button }}
                                touchableStyle={{ backgroundColor: 'transparent', marginLeft: 10 }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />
                        )
                    }
                </View>
            </View>
        </Modal>
    );
}

export default StatusModal;