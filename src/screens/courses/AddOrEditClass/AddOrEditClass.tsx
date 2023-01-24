import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import { CourseForm } from '../../../components/courses';
import { Title } from '../../../components/ui';

import { useCourses } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

const AddOrEditClass = () => {
    const { state: { selectedClass } } = useCourses();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
        >
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    textStyle={{ fontSize: 24 }}
                    text={ `${ (selectedClass.id === '') ? 'Agregar' : 'Editar' } clase del curso` }
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddOrEditClass;