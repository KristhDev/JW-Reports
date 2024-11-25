import React from 'react';
import { Linking, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useStatus } from '../../hooks';
import { themeStylesheet } from '@theme';
import { Modal, ModalActions } from '@ui';

/**
 * This modal is responsible for displaying the success and error
 * states of the app.
 *
 * @return {JSX.Element} return jsx element to render status modal
 */
const StatusModal = (): JSX.Element => {
    const { state: { msg }, clearStatus } = useStatus();
    const { styles: themeStyles } = useStyles(themeStylesheet);

    const configMsg = 'Para realizar está acción necesita permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.';

    const btnText = (msg === configMsg)
        ? 'CONFIGURACIÓN'
        : 'ESTA BIEN';

    /**
     * If the message is the config message, open the settings page, otherwise clear the status.
     *
     * @return {void} This function returns nothing
     */
    const handleClose = (): void => {
        clearStatus();
        if (msg === configMsg) Linking.openSettings();
    }

    return (
        <Modal isOpen={ !!msg }>
            <View style={{ ...themeStyles.modalContainer, minHeight: 120 }}>

                {/* Modal text */}
                <View>
                    <Text style={{ ...themeStyles.modalText, marginBottom: 0 }}>
                        { msg }
                    </Text>
                </View>

                {/* Modal actions */}
                <ModalActions
                    cancelButtonText="CANCELAR"
                    confirmTextButton={ btnText }
                    onCancel={ clearStatus }
                    onConfirm={ handleClose }
                    showCancelButton={ (msg === configMsg) as any }
                    showConfirmButton
                />
            </View>
        </Modal>
    );
}

export default StatusModal;