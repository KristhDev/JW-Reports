import React, { useState } from 'react';
import { Linking, ScrollView, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';

/* Constants */
import { THEME_OPTIONS } from '@application/constants';

/* Adapters */
import { DeviceInfo } from '@infrasturcture/adapters';

/* Modules */
import { useStatus } from '../../hooks';
import { ThemeModal, useTheme } from '@theme';
import { SectionBtn, SectionContent, Switch, useUI } from '@ui';

/* Package */
import { version as appVersion } from '@package';

/**
 * This screen is responsible for displaying all the app's settings through
 * sections that direct it to other screens, modals or actions.
 *
 * @return {JSX.Element} return jsx element to render the settings
 */
const Settings = (): JSX.Element => {
    const [ showThemeModal, setShowThemeModal ] = useState<boolean>(false);

    const router = useRouter();
    const { theme: { colors, fontSizes, margins } } = useStyles();

    const { setStatus } = useStatus();
    const { state: { selectedTheme } } = useTheme();
    const { state: { userInterface }, setOldDatetimePicker } = useUI();

    const buildVersion = DeviceInfo.getBuildVersion();

    /**
     * When the user clicks the button, set the status to a new object with a code of 200 and a msg of
     * 'Para más información o dejar sus comentarios acerca de la aplicación, escriba al correo:
     * kristhdev@gmail.com'.
     *
     * @return {void} This function returns nothing
     */
    const handleMoreInfo = (): void => {
        setStatus({
            code: 200,
            msg: 'Para más información o dejar sus comentarios acerca de la aplicación, por favor escriba al siguiente correo: kristhdev@gmail.com',
        });
    }

    return (
        <>
            <ScrollView overScrollMode="never">

                {/* Acount secction */}
                <SectionContent title="MI CUENTA">
                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/profile') }
                        subText="Actualice sus datos personales"
                        text="Perfil"
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/credentials') }
                        subText="Cambie sus credenciales (correo y contraseña)"
                        text="Credenciales"
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/export-data') }
                        subText="Exporte todos sus datos de la aplicación"
                        text="Exportar Información"
                    />
                </SectionContent>

                {/* UI section */}
                <SectionContent title="INTERFAZ DE USUARIO">
                    <SectionBtn
                        onPress={ () => setShowThemeModal(true) }
                        subText={ THEME_OPTIONS.find(t => t.value === selectedTheme)?.label || '' }
                        text="Apariencia"
                    />

                    <SectionBtn
                        onPress={ () => setOldDatetimePicker(!userInterface.oldDatetimePicker) }
                        subText="Puede escoger entre los actuales o los antiguos selectores de mes, fecha y tiempo"
                        text="Selectores de mes, fecha y hora"
                    >
                        <Switch
                            onChange={ () => setOldDatetimePicker(!userInterface.oldDatetimePicker) }
                            value={ userInterface.oldDatetimePicker }
                        />
                    </SectionBtn>
                </SectionContent>

                {/* Privacy section */}
                <SectionContent title="PRIVACIDAD">
                    <SectionBtn
                        onPress={ () => Linking.openSettings() }
                        subText="Admita o rechace los permisos de la aplicación (tenga en cuenta que ciertas funcionalidades se verán afectadas)."
                        text="Permisos"
                    />
                </SectionContent>

                <SectionContent title="COMENTARIOS">
                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/feedback') }
                        subText="Comparta sus sugerencias para mejorar la aplicación."
                        text="Sugerencias"
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/report-errors') }
                        subText="Reporte los errores que se presenten en la aplicación."
                        text="Reportar un error"
                    />
                </SectionContent>

                {/* About section */}
                <SectionContent
                    containerStyle={{ borderBottomWidth: 0 }}
                    title="SOBRE"
                >
                    <SectionBtn
                        onPress={ () => {} }
                        subText={ `${ appVersion } (${ buildVersion })` }
                        text="Versión"
                    />

                    <SectionBtn
                        onPress={ () => Linking.openURL(process.env.EXPO_PUBLIC_REPOSITORY_URL!) }
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
                    style={{ color: colors.icon, fontSize: (fontSizes.sm - 2), padding: margins.sm }}
                    testID="settings-copyright-text"
                >
                    Copyright © { new Date().getFullYear() }
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