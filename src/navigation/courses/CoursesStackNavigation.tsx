import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import CoursesTopTabsNavigation from './CoursesTopTabsNavigation';

// import { AddOrEditRevisit, RevisitDetail } from '../../screens/revisits';

// import { RevisitHeader } from '../../components/revisits';
// import { BackButton } from '../../components/ui';

import { useCourses, useTheme } from '../../hooks';

import { CoursesStackParamsList } from '../../interfaces/courses';

const Stack = createStackNavigator<CoursesStackParamsList>();

const CoursesStackNavigation = () => {
    // const { state: { selectedCourse } } = useCourses();
    const { state: { colors } } = useTheme();


    // const revisitDetailTitle = `Curso a ${ selectedCourse.person_name }`;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ CoursesTopTabsNavigation }
                name="CoursesTopTabsNavigation"
                options={{ title: 'Cursos' }}
            />

            {/* <Stack.Screen
                component={ RevisitDetail }
                name="RevisitDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <RevisitHeader
                            deleteButton={ true }
                            editButton={ true }
                        />
                    ),
                    title: (revisitDetailTitle.length >= 22) ? revisitDetailTitle.slice(0, 22) + '...' : revisitDetailTitle
                }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <RevisitHeader
                            deleteButton={ seletedRevisit.id !== '' }
                            editButton={ false }
                        />
                    ),
                    title: `${ seletedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            /> */}
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;