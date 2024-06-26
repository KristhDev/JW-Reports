import React, { FC, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

/* Components */
import { TabBarBtn } from '../TabBarBtn';

/* Styles */
import stylesheet from './styles';

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
    const { styles } = useStyles(stylesheet);

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
            { (!hideTabBar) && (
                <View style={styles.container }>
                    { state.routes.map((route, index) => (
                        <TabBarBtn
                            active={ state.index === index }
                            key={ route.key }
                            onPress={ () => navigate({ name: route.name, params: { screen: firstScreens[(route.name as keyof typeof firstScreens)] } } as never) }
                            iconName={ icons[index] }
                            title={ descriptors[route.key]?.options.title || '' }
                            totalTabs={ state.routes.length }
                            color={
                                (state.index === index)
                                    ? descriptors[route.key]?.options.tabBarActiveTintColor
                                    : descriptors[route.key]?.options.tabBarInactiveTintColor
                            }
                        />
                    )) }
                </View>
            ) }
        </>
    );
}