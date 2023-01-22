import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { SectionButton, SectionContent } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { ThemeModal } from '../../../theme/screens';

const Settings = () => {
    const [ showThemeModal, setShowThemeModal ] = useState<boolean>(false);
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
                        onPress={ () => {} }
                        subText="Actualize sus datos personales"
                        text="Perfil"
                    />

                    <SectionButton
                        onPress={ () => {} }
                        subText="Cambie su contraseña"
                        text="Contraseña"
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