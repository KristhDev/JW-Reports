import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { FeedbackForm } from '../../components';
import { Title } from '@ui/components';

/* Styles */
import { themeStylesheet } from '@theme/styles';

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