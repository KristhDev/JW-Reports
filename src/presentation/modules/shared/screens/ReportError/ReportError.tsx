import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

import { ReportErrorForm } from '../../components';
import { Title } from '@ui/components';

import { useTranslation } from '@ui/hooks';

import { themeStylesheet } from '@theme/styles';

const ReportErrorScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);
    const { translate } = useTranslation();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text={ translate('screens.ui.titles.reportAnError') }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <ReportErrorForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ReportErrorScreen;