import React from 'react';
import { Linking, Text, View } from 'react-native';

import { Modal } from '../../ui';

import { Button } from '../../../components/ui';

import { useStatus, useTheme } from '../../../hooks';

import { waitToCall } from '../../../utils';

import themeStyles from '../../../theme/styles';

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
                    ...themeStyles.modalContainer,
                    backgroundColor: colors.modal,
                    minHeight: 120,
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            ...themeStyles.modalText,
                            color: colors.modalText,
                        }}>
                            { msg }
                    </Text>
                </View>

                <View style={ themeStyles.modalActions }>
                    {
                        (msg === configMsg) && (
                            <Button
                                containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                onPress={ clearStatus }
                                text="Cancelar"
                                textStyle={{ color: colors.button }}
                                touchableStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />
                        )
                    }

                    <Button
                        containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                        onPress={ () => waitToCall(handleClose) }
                        text={ btnText }
                        textStyle={{ color: colors.button }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default StatusModal;