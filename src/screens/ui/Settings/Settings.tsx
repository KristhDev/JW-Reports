import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SectionButton, SectionContent } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { ThemeModal } from '../../../theme/screens';

const Settings = () => {
    const [ showThemeModal, setShowThemeModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { theme } } = useTheme();

    const themeText = {
        default: 'Modo predeterminado',
        light: 'Modo claro',
        dark: 'Modo oscuro'
    }

    return (
        <>
            <ScrollView overScrollMode="never">
                <SectionContent title="MI CUENTA">
                    <SectionButton
                        onPress={ () => navigate('ProfileScreen' as never) }
                        subText="Actualize sus datos personales"
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
                        subText={ themeText[theme] }
                        text="Apariencia"
                    />
                </SectionContent>
            </ScrollView>

            <ThemeModal
                isOpen={ showThemeModal }
                onClose={ () => setShowThemeModal(false) }
            />
        </>
    );
}

export default Settings;