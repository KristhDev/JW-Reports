import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

import { ReportErrorForm } from '../../components';
import { Title } from '@ui';

import { themeStylesheet } from '@theme';

const ReportErrorScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text="REPORTAR ERROR"
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <ReportErrorForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default ReportErrorScreen;