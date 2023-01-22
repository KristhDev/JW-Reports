import React from 'react';
import { ScrollView } from 'react-native';

import { SectionButton, SectionContent } from '../../../components/ui';

import { useTheme } from '../../../hooks';

const Settings = () => {
    const { state: { theme } } = useTheme();

    const themeText = {
        default: 'Modo predeterminado',
        light: 'Modo claro',
        dark: 'Modo oscuro'
    }

    return (
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
                    onPress={ () => {} }
                    subText={ themeText[theme] }
                    text="Apariencia"
                />
            </SectionContent>
        </ScrollView>
    );
}

export default Settings;