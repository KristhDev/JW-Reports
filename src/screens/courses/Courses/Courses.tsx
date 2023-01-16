import React, { FC, useEffect } from 'react';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { CoursesList } from '../../../components/courses';
import { Fab } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { CoursesTopTabsParamsList } from '../../../interfaces/courses';

import themeStyles from '../../../theme/styles';

type CoursesProps = MaterialTopTabScreenProps<CoursesTopTabsParamsList>;

const Courses: FC<CoursesProps> = ({ route }) => {
    const { addListener, removeListener, getState } = useNavigation();

    const { setCoursesScreenHistory } = useCourses();
    const { state: { colors } } = useTheme();

    useEffect(() => {
        addListener('focus', () => {
            const { index, routeNames } = getState();
            setCoursesScreenHistory(routeNames[index]);
        });

        return () => {
            removeListener('focus', () => {});
        }
    }, []);

    return (
        <>
            <CoursesList
                filter={ route.params.filter }
                title={ route.params.title }
                emptyMessage={ route.params.emptyMessage }
            />

            {
                (route.name === 'CoursesScreen') && (
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
                        onPress={ () => {} }
                        style={ themeStyles.fabBottomRight }
                        touchColor="rgba(0, 0, 0, 0.15)"
                    />
                )
            }
        </>
    );
}

export default Courses;