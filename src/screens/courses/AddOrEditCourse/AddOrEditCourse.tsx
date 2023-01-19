import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CourseForm } from '../../../components/courses';
import { Title } from '../../../components/ui';

import { useCourses } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const AddOrEditCourse = () => {
    const { state: { selectedCourse } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (selectedCourse.id === '') ? 'Agregar' : 'Editar' } curso bíblico` }
                />

                <CourseForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditCourse;