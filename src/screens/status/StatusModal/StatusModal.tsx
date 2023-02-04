import React from 'react';
import { Linking, Text, View } from 'react-native';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { Button } from '../../../components/ui';

/* Hooks */
import { useStatus, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This modal is responsible for displaying the success and error
 * states of the app.
 */
const StatusModal = () => {
    const { state: { msg }, clearStatus } = useStatus();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const configMsg = 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación';

    const btnText = (msg === configMsg)
        ? 'CONFIGURACIÓN'
        : 'ESTÁ BIEN';

    /**
     * If the message is the config message, open the settings page, otherwise clear the status.
     */
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

                {/* Modal text */}
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            ...themeStyles.modalText,
                            color: colors.modalText,
                        }}
                    >
                        { msg }
                    </Text>
                </View>

                {/* Modal actions */}
                <View style={ themeStyles.modalActions }>

                    {/* Button settings */}
                    { (msg === configMsg) && (
                        <Button
                            containerStyle={{ paddingHorizontal: 12 }}
                            onPress={ clearStatus }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                            underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                        />
                    ) }

                    {/* Confirm button */}
                    <Button
                        containerStyle={{ paddingHorizontal: 12 }}
                        onPress={ handleClose }
                        text={ btnText }
                        textStyle={{ color: colors.button, fontSize: 16 }}
                        touchableStyle={{ backgroundColor: 'transparent' }}
                        underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                    />
                </View>
            </View>
        </Modal>
    );
}

export default StatusModal;