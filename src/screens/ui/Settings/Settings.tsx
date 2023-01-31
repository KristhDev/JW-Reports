import React, { useState } from 'react';
import { Linking, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { REPOSITORY_URL } from '@env';

import { SectionButton, SectionContent } from '../../../components/ui';

import { useStatus, useTheme } from '../../../hooks';

import { ThemeModal } from '../../../theme/screens';

import { THEME_OPTIONS } from '../../../utils';

const Settings = () => {
    const [ showThemeModal, setShowThemeModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setStatus } = useStatus();
    const { state: { colors, theme } } = useTheme();

    const handleMoreInfo = () => {
        setStatus({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, escriba al correo: kristhdev@gmail.com',
        });
    }

    return (
        <>
            <ScrollView overScrollMode="never">
                <SectionContent title="MI CUENTA">
                    <SectionButton
                        onPress={ () => navigate('ProfileScreen' as never) }
                        subText="Actualice sus datos personales"
                        text="Perfil"
                    />

                    <SectionButton
                        onPress={ () => navigate('CredentialsScreen' as never) }
                        subText="Cambie sus credenciales (correo y contraseña)"
                        text="Credenciales"
                    />
                </SectionContent>

                <SectionContent title="PANTALLA">
                    <SectionButton
                        onPress={ () => setShowThemeModal(true) }
                        subText={ THEME_OPTIONS.find(t => t.value === theme)?.label || '' }
                        text="Apariencia"
                    />
                </SectionContent>

                <SectionContent title="PRIVACIDAD">
                    <SectionButton
                        onPress={ () => Linking.openSettings() }
                        subText="Admita o rechace los permisos de la aplicación (tenga en cuenta que ciertas funcionalidades se verán afectadas)."
                        text="Permisos"
                    />
                </SectionContent>

                <SectionContent
                    containerStyle={{ borderBottomWidth: 0 }}
                    title="SOBRE"
                >
                    <SectionButton
                        onPress={ () => {} }
                        subText="1.0.0"
                        text="Versión"
                    />

                    <SectionButton
                        onPress={ () => Linking.openURL(REPOSITORY_URL) }
                        subText="Código fuente de la aplicación"
                        text="Repositorio"
                    />

                    <SectionButton
                        onPress={ handleMoreInfo }
                        subText="Obtenga información sobre la aplicación o deje sus comentarios"
                        text="Más información"
                    />
                </SectionContent>

                <Text style={{ color: colors.icon, fontSize: 14, padding: 20 }}>
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