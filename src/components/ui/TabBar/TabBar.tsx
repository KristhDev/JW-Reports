import React, { FC, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

/* Components */
import { TabBarBtn } from '../TabBarBtn';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Styles */
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

/**
 * This component is responsible for displaying a custom navigation bar
 * for the app
 *
 * @param {BottomTabBarProps} props { navigation, state, descriptors } - This is the
 * props for functionality of the component
 * @return {JSX.Element} Return jsx element to render tab bar of navigation
 */
export const TabBar: FC<BottomTabBarProps> = ({ state, descriptors }): JSX.Element => {
    const [ hideTabBar, setHideTabBar ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { state: { colors } } = useTheme();

    const icons = [ 'home-outline', 'briefcase-outline', 'book-outline' ];
    const firstScreens = {
        'PreachingStackNavigation': 'HomeScreen',
        'RevisitsStackNavigation': 'RevisitsTopTabsNavigation',
        'CoursesStackNavigation': 'CoursesTopTabsNavigation',
    }

    /**
     * Effect to show or hide tabbar when the keyboard is shown or hidden
     */
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setHideTabBar(true);
        });

        Keyboard.addListener('keyboardDidHide', () => {
            setHideTabBar(false);
        });

        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        }
    }, []);

    return (
        <>
            {
                (!hideTabBar) && (
                    <View
                        style={{
                            ...styles.container,
                            backgroundColor: colors.bottom,
                        }}
                    >
                        { state.routes.map((route, index) => (
                            <TabBarBtn
                                active={ state.index === index }
                                key={ route.key }
                                onPress={ () => navigate({ name: route.name, params: { screen: firstScreens[(route.name as keyof typeof firstScreens)] } } as never) }
                                iconName={ icons[index] }
                                title={ descriptors[route.key]?.options.title || '' }
                                color={
                                    (state.index === index)
                                        ? descriptors[route.key]?.options.tabBarActiveTintColor
                                        : descriptors[route.key]?.options.tabBarInactiveTintColor
                                }
                            />
                        )) }
                    </View>
                )
            }
        </>
    );
}