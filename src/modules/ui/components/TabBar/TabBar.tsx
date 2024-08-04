import React, { FC } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { TabBarBtn } from '../TabBarBtn';

/* Hooks */
import { useUI } from '../../hooks';

/* Styles */
import { stylesheet } from './styles';

/**
 * This component is responsible for displaying a custom navigation bar
 * for the app
 *
 * @param {BottomTabBarProps} props { navigation, state, descriptors } - This is the
 * props for functionality of the component
 * @return {JSX.Element} Return jsx element to render tab bar of navigation
 */
export const TabBar: FC<BottomTabBarProps> = ({ state, descriptors }): JSX.Element => {
    const { navigate } = useNavigation();
    const { styles } = useStyles(stylesheet);

    const { state: { isKeyboardVisible } } = useUI();

    const icons = [ 'home-outline', 'briefcase-outline', 'book-outline' ];
    const firstScreens = {
        'PreachingStackNavigation': 'HomeScreen',
        'RevisitsStackNavigation': 'RevisitsTopTabsNavigation',
        'CoursesStackNavigation': 'CoursesTopTabsNavigation',
    }

    if (isKeyboardVisible) return (<></>);

    return (
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
    );
}