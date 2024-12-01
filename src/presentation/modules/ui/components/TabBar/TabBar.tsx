import React, { FC } from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { TabBarBtn } from '../TabBarBtn';

/* Hooks */
import { useAuth } from '@auth';
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
export const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }): JSX.Element => {
    const { styles } = useStyles(stylesheet);

    const { state: { user } } = useAuth();
    const { state: { keyboard } } = useUI();

    const icons = [ 'home-outline', 'briefcase-outline', 'book-outline' ];
    const firstScreens = {
        'preaching': (user.precursor !== 'ninguno') ? 'precursor' : 'publisher',
        'revisits': '(tabs)',
        'courses': '(tabs)',
    }

    const handleNavigate = (routeName: string): void => {
        navigation.navigate(routeName, { screen: firstScreens[routeName as never] });
    }

    /**
     * This function returns the tint color of the icon in the tab bar.
     * If the index is equal to the current state.index, the function returns
     * the tabBarActiveTintColor, otherwise it returns the tabBarInactiveTintColor.
     * If the tintColor is not defined, the function returns undefined.
     * @param {number} index - The index of the tab bar icon.
     * @return {string | undefined} The tint color of the icon in the tab bar.
     */
    const handleGetTintColor = (index: number): string | undefined => {
        return (state.index === index)
            ? descriptors[state.routes[index].key]?.options.tabBarActiveTintColor
            : descriptors[state.routes[index].key]?.options.tabBarInactiveTintColor;
    }

    if (keyboard.isVisible) return (<></>);

    return (
        <View style={ styles.container }>
            { state.routes.map((route, index) => (
                <TabBarBtn
                    active={ state.index === index }
                    color={ handleGetTintColor(index) }
                    iconName={ icons[index] }
                    key={ route.key }
                    onPress={ () => handleNavigate(route.name) }
                    title={ descriptors[route.key]?.options.title || '' }
                    totalTabs={ state.routes.length }
                />
            )) }
        </View>
    );
}