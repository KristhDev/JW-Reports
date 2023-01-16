import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { InfoText } from '../../ui';

import { useCourses } from '../../../hooks';

import { ListEmptyComponentProps } from './interfaces';

export const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ msg }) => {
    const { height } = useWindowDimensions();

    const { state: { courses, isCoursesLoading } } = useCourses();

    return (
        <>
            {
                (!isCoursesLoading && courses.length === 0) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.20 }}
                        text={ msg }
                    />
                )
            }
        </>
    );
}