import React from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';

import { useCourses, useTheme } from '../../../hooks';

export const ListFooterComponent = () => {
    const { height } = useWindowDimensions();

    const { state: { courses, isCoursesLoading } } = useCourses();
    const { state: { colors } } = useTheme();

    return (
        <>
            {
                (isCoursesLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size="large"
                        style={{ marginTop: height * ((courses.length === 0) ? 0.22 : 0.10)  }}
                    />
                )
            }
        </>
    )
}