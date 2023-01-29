import React from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';

import { useCourses, useTheme } from '../../../hooks';

export const ListFooterComponent = () => {
    const { height } = useWindowDimensions();

    const { state: { lessons, isLessonsLoading } } = useCourses();
    const { state: { colors } } = useTheme();

    return (
        <>
            {
                (isLessonsLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size="large"
                        style={{ marginTop: height * ((lessons.length === 0) ? 0.22 : 0.10)  }}
                    />
                )
            }
        </>
    )
}