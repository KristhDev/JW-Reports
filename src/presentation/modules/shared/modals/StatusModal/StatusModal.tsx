import React from 'react';
import { Linking, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Screens */
import { Modal } from '@ui/screens';

/* Components */
import { ModalActions } from '@ui/components';

/* Hooks */
import { useStatus } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This modal is responsible for displaying the success and error
 * states of the app.
 *
 * @return {JSX.Element} return jsx element to render status modal
 */
const StatusModal = (): JSX.Element => {
    const { styles: themeStyles } = useStyles(themeStylesheet);

    const { state: { msg }, clearStatus } = useStatus();
    const { translate } = useTranslation();

    const configMsg = translate('messages.permissions.request');

    const btnText = (msg === configMsg)
        ? translate('forms.actions.settings').toUpperCase()
        : translate('forms.actions.ok').toUpperCase();

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
                    cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                    confirmTextButton={ btnText }
                    onCancel={ clearStatus }
                    onConfirm={ handleClose }
                    showCancelButton={ (msg === configMsg) }
                    showConfirmButton
                />
            </View>
        </Modal>
    );
}

export default StatusModal;