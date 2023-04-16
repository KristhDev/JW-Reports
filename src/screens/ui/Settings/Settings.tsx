import React, { useState } from 'react';
import { Linking, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Env */
import { REPOSITORY_URL } from '@env';

/* Components */
import { SectionBtn, SectionContent } from '../../../components/ui';

/* Hooks */
import { useStatus, useTheme } from '../../../hooks';

/* Screens */
import { ThemeModal } from '../../../theme';

/* Utils */
import { THEME_OPTIONS } from '../../../utils';

/**
 * This screen is responsible for displaying all the app's settings through
 * sections that direct it to other screens, modals or actions.
 */
const Settings = () => {
    const [ showThemeModal, setShowThemeModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setStatus } = useStatus();
    const { state: { colors, theme } } = useTheme();

    /**
     * When the user clicks the button, set the status to a new object with a code of 200 and a msg of
     * 'Para más información o dejar sus comentarios acerca de la aplicación, escriba al correo:
     * kristhdev@gmail.com'.
     */
    const handleMoreInfo = () => {
        setStatus({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, escriba al correo: kristhdev@gmail.com',
        });
    }

    return (
        <>
            <ScrollView overScrollMode="never">

                {/* Acount secction */}
                <SectionContent title="MI CUENTA">
                    <SectionBtn
                        onPress={ () => navigate('ProfileScreen' as never) }
                        subText="Actualice sus datos personales"
                        text="Perfil"
                    />

                    <SectionBtn
                        onPress={ () => navigate('CredentialsScreen' as never) }
                        subText="Cambie sus credenciales (correo y contraseña)"
                        text="Credenciales"
                    />
                </SectionContent>

                {/* Screen section */}
                <SectionContent title="PANTALLA">
                    <SectionBtn
                        onPress={ () => setShowThemeModal(true) }
                        subText={ THEME_OPTIONS.find(t => t.value === theme)?.label || '' }
                        text="Apariencia"
                    />
                </SectionContent>

                {/* Privacy section */}
                <SectionContent title="PRIVACIDAD">
                    <SectionBtn
                        onPress={ () => Linking.openSettings() }
                        subText="Admita o rechace los permisos de la aplicación (tenga en cuenta que ciertas funcionalidades se verán afectadas)."
                        text="Permisos"
                    />
                </SectionContent>

                {/* About section */}
                <SectionContent
                    containerStyle={{ borderBottomWidth: 0 }}
                    title="SOBRE"
                >
                    <SectionBtn
                        onPress={ () => {} }
                        subText="1.0.0"
                        text="Versión"
                    />

                    <SectionBtn
                        onPress={ () => Linking.openURL(REPOSITORY_URL) }
                        subText="Código fuente de la aplicación"
                        text="Repositorio"
                    />

                    <SectionBtn
                        onPress={ handleMoreInfo }
                        subText="Obtenga información sobre la aplicación o deje sus comentarios"
                        text="Más información"
                    />
                </SectionContent>

                {/* Copyright text */}
                <Text
                    style={{ color: colors.icon, fontSize: 14, padding: 20 }}
                    testID="settings-copyright-text"
                >
                    Copyright © { dayjs().year() }
                </Text>
            </ScrollView>

            <ThemeModal
                isOpen={ showThemeModal }
                onClose={ () => setShowThemeModal(false) }
            />
        </>
    );
}

export default Settings;