import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useFocusEffect, withLayoutContext } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Hooks */
import { useCourses } from '@courses';

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function CoursesTopTabsLauyout(): JSX.Element {
    const { width } = useWindowDimensions();
    const { theme: { colors } } = useStyles();

    const { state: { selectedCourse }, setSelectedCourse } = useCourses();

    useFocusEffect(
        useCallback(() => {
            setSelectedCourse(selectedCourse);
        }, [])
    );

    return (
        <TopTabs
            overScrollMode="never"
            screenOptions={ ({ navigation }) => ({
                sceneStyle: { backgroundColor: colors.contentHeader },
                tabBarActiveTintColor: colors.button,
                tabBarInactiveTintColor: colors.headerText,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.button,
                    height: 3
                },
                tabBarItemStyle: {
                    width: width / 3
                },
                tabBarLabelStyle: {
                    fontWeight: (navigation.isFocused()) ? 'bold' : 'normal'
                },
                tabBarPressColor: (navigation.isFocused()) ? colors.buttonTranslucent : colors.buttonTransparent,
                tabBarScrollEnabled: true,
                tabBarStyle: {
                    backgroundColor: colors.contentHeader,
                    borderBottomColor: colors.header,
                    borderBottomWidth: 1
                },
            }) }
        >
            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No has agregado ningún curso.',
                    filter: 'all',
                    title: 'TODOS MIS CURSOS',
                }}
                name="index"
                options={{ title: 'Todos' }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No tienes ningún curso activo.',
                    filter: 'active',
                    title: 'CURSOS ACTIVOS'
                }}
                name="active"
                options={{ title: 'Activos' }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No tienes ningún curso suspendido.',
                    filter: 'suspended',
                    title: 'CURSOS SUSPENDIDOS'
                }}
                name="suspended"
                options={{ title: 'Suspendidos' }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'Ninguno de tus estudiantes ha terminado el curso.',
                    filter: 'finished',
                    title: 'CURSOS TERMINADOS'
                }}
                name="finished"
                options={{ title: 'Terminados' }}
            />
        </TopTabs>
    );
}