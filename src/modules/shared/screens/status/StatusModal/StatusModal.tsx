import React from 'react';
import { Linking, useWindowDimensions, Text, View } from 'react-native';

/* Modules */
import { Modal, Button } from '../../../../ui';
import { useStatus } from '../../../hooks';
import { styles as themeStyles, useTheme } from '../../../../theme';

/**
 * This modal is responsible for displaying the success and error
 * states of the app.
 *
 * @return {JSX.Element} return jsx element to render status modal
 */
const StatusModal = (): JSX.Element => {
    const { width } = useWindowDimensions();
    const { state: { msg }, clearStatus } = useStatus();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const configMsg = 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.';

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
            <View
                style={{
                    ...themeStyles.modalContainer,
                    backgroundColor: colors.modal,
                    width: width - 48,
                    minHeight: 120,
                }}
            >

                {/* Modal text */}
                <View>
                    <Text
                        style={{
                            ...themeStyles.modalText,
                            color: colors.modalText,
                            marginBottom: 0,
                            width: '100%',
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
                            containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                            onPress={ clearStatus }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                            underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                        />
                    ) }

                    {/* Confirm button */}
                    <Button
                        containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
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