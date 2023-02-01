import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { INIT_LESSON } from '../../../features/courses';

import { LessonsList } from '../../../components/courses';
import { Fab } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

const Lessons = () => {
    const { navigate } = useNavigation();

    const { setSelectedLesson, loadLessons } = useCourses();
    const { state: { colors } } = useTheme();

    const handleNavigate = () => {
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString(),
        });

        navigate('AddOrEditLessonScreen' as never);
    }

    useEffect(() => {
        loadLessons({});
    }, []);

    return (
        <>
            <LessonsList />

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ handleNavigate }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />
        </>
    );
}

export default Lessons;