import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LessonForm } from '../../../components/courses';
import { Title } from '../../../components/ui';

import { useCourses } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

const AddOrEditLesson = () => {
    const { state: { selectedLesson } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ (selectedLesson.id === '') ? 'Agregar clase para el curso' : 'Editar clase del curso' }
                />

                <LessonForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditLesson;