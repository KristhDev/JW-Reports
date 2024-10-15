import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

import { FeedbackForm } from '../../components';
import { themeStylesheet } from '@theme';
import { Title } from '@ui';

const FeedbackScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text="SUGERENCIAS"
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <FeedbackForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default FeedbackScreen;