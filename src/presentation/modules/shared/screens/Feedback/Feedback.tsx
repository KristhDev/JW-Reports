import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { FeedbackForm } from '../../components';
import { Title } from '@ui/components';

/* Hooks */
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';

const FeedbackScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);
    const { translate } = useTranslation();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    text={ translate('screens.ui.titles.feedback') }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                <FeedbackForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default FeedbackScreen;