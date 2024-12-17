import React, { FC } from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { TabBarBtn } from '../TabBarBtn';

/* Hooks */
import { useUI } from '../../hooks';

/* Styles */
import { stylesheet } from './styles';

export interface NavigateOptions {
    key: string;
    index: number;
    routeName: string;
    routeParams?: any;
}

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

    const { state: { keyboard } } = useUI();

    const icons = [ 'home-outline', 'briefcase-outline', 'book-outline' ];

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

    /**
     * This function is called when a tab bar button is pressed. It emits a
     * 'tabPress' event, and if the event is not prevented, it navigates to the
     * route specified by the routeName and routeParams if they are not
     * undefined.
     *
     * @param {{ key: string, index: number, routeName: string, routeParams?: any }} options
     * - The options object that is passed to the function.
     * @param {string} options.key - The key of the route that the tab bar button
     * is associated with.
     * @param {number} options.index - The index of the route in the state routes
     * array.
     * @param {string} options.routeName - The name of the route to navigate to.
     * @param {any} [options.routeParams] - The route params to pass to the
     * navigate function.
     * @return {void} The function does not return anything.
     */
    const handleNavigate = ({ key, index, routeName, routeParams }: NavigateOptions): void => {
        const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true
        });

        if (!event.defaultPrevented && index !== state.index) {
            navigation.navigate(routeName, routeParams);
        }
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
                    onPress={ () => handleNavigate({ key: route.key, index, routeName: route.name }) }
                    title={ descriptors[route.key]?.options.title || '' }
                    totalTabs={ state.routes.length }
                />
            )) }
        </View>
    );
}