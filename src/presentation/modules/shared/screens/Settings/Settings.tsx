import React, { useState } from 'react';
import { Linking, ScrollView, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';

/* Config */
import { env } from '@config/env';

/* Constants */
import { THEME_OPTIONS } from '@application/constants';

/* Adapters */
import { DeviceInfoAdapter } from '@infrastructure/adapters';

/* Screens */
import { ThemeModal } from '@theme/screens';

/* Components */
import { SectionBtn, SectionContent, Switch } from '@ui/components';

/* Hooks */
import { useStatus } from '../../hooks';
import { useTheme } from '@theme/hooks';
import { useTranslation, useUI } from '@ui/hooks';

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
    const { translate } = useTranslation();

    const buildVersion = DeviceInfoAdapter.getBuildVersion();

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
            msg: translate('screens.settings.moreInfo'),
        });
    }

    return (
        <>
            <ScrollView overScrollMode="never">

                {/* Acount secction */}
                <SectionContent title={ translate('screens.settings.sections.account.title') }>
                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/profile') }
                        subText={ translate('screens.settings.sections.account.subTexts.profile') }
                        text={ translate('screens.settings.sections.account.texts.profile') }
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/credentials') }
                        subText={ translate('screens.settings.sections.account.subTexts.credentials') }
                        text={ translate('screens.settings.sections.account.texts.credentials') }
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/export-data') }
                        subText={ translate('screens.settings.sections.account.subTexts.exportInfo') }
                        text={ translate('screens.settings.sections.account.texts.exportInfo') }
                    />
                </SectionContent>

                {/* UI section */}
                <SectionContent title={ translate('screens.settings.sections.ui.title') }>
                    <SectionBtn
                        onPress={ () => setShowThemeModal(true) }
                        subText={ THEME_OPTIONS.find(t => t.value === selectedTheme)?.label || '' }
                        text={ translate('screens.settings.sections.ui.texts.appearance') }
                    />

                    <SectionBtn
                        onPress={ () => setOldDatetimePicker(!userInterface.oldDatetimePicker) }
                        subText={ translate('screens.settings.sections.ui.subTexts.datetimeSelectors') }
                        text={ translate('screens.settings.sections.ui.texts.datetimeSelectors') }
                    >
                        <Switch
                            onChange={ () => setOldDatetimePicker(!userInterface.oldDatetimePicker) }
                            value={ userInterface.oldDatetimePicker }
                        />
                    </SectionBtn>
                </SectionContent>

                {/* Privacy section */}
                <SectionContent title={ translate('screens.settings.sections.privacy.title') }>
                    <SectionBtn
                        onPress={ () => Linking.openSettings() }
                        subText={ translate('screens.settings.sections.privacy.subTexts.permissions') }
                        text={ translate('screens.settings.sections.privacy.texts.permissions') }
                    />
                </SectionContent>

                <SectionContent title={ translate('screens.settings.sections.comments.title') }>
                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/feedback') }
                        subText={ translate('screens.settings.sections.comments.subTexts.feedback') }
                        text={ translate('screens.settings.sections.comments.texts.feedback') }
                    />

                    <SectionBtn
                        onPress={ () => router.navigate('/(app)/settings/report-errors') }
                        subText={ translate('screens.settings.sections.comments.subTexts.reportError') }
                        text={ translate('screens.settings.sections.comments.texts.reportError') }
                    />
                </SectionContent>

                {/* About section */}
                <SectionContent
                    containerStyle={{ borderBottomWidth: 0 }}
                    title={ translate('screens.settings.sections.about.title') }
                >
                    <SectionBtn
                        onPress={ () => {} }
                        subText={ `${ appVersion } (${ buildVersion })` }
                        text={ translate('screens.settings.sections.about.texts.version') }
                    />

                    <SectionBtn
                        onPress={ () => Linking.openURL(env.REPOSITORY_URL!) }
                        subText={ translate('screens.settings.sections.about.subTexts.repository') }
                        text={ translate('screens.settings.sections.about.texts.repository') }
                    />

                    <SectionBtn
                        onPress={ handleMoreInfo }
                        subText={ translate('screens.settings.sections.about.subTexts.moreInfo') }
                        text={ translate('screens.settings.sections.about.texts.moreInfo') }
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