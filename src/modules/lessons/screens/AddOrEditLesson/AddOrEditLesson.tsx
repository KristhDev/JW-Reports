import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { LessonForm } from '../../components';
import { Title } from '@ui';

/* Hooks */
import { useLessons } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components
 * to add or edit a lesson.
 *
 * @return {JSX.Element} rendered component to show form to add or edit a lesson
 */
const AddOrEditLesson = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);
    const { state: { selectedLesson } } = useLessons();

    const title = (selectedLesson.id === '')
        ? 'AGREGAR CLASE AL CURSO'
        : 'EDITAR CLASE DEL CURSO';

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={ themeStyles.screenContainer }>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: fontSizes.md }}
                    text={ title }
                />

                <LessonForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditLesson;