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
     * Navigates to a specified route when a tab is pressed, unless the default
     * behavior is prevented. It emits a 'tabPress' event and checks if the
     * navigation should proceed based on the current tab index.
     *
     * @param {NavigateOptions} { index, key, routeName, routeParams } - The navigation options:
     * - index: The index of the tab to navigate to.
     * - key: The key identifying the target tab.
     * - routeName: The name of the route to navigate to.
     * - routeParams: Optional parameters for the route.
     * @return {void} This function does not return anything.
     */
    const handleNavigate = ({ index, key, routeName, routeParams }: NavigateOptions): void => {
        const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true,
        });

        if (!event.defaultPrevented && index !== state.index) {
            navigation.navigate(routeName, routeParams);
        }
    }

    /**
     * Emits a 'tabLongPress' event for the specified tab, when a tab is
     * long pressed.
     *
     * @param {string} key - The key identifying the target tab.
     * @return {void} This function does not return anything.
     */
    const handleLongPress = (key: string): void => {
        navigation.emit({ type: 'tabLongPress', target: key });
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
                    onLongPress={ () => handleLongPress(route.key) }
                    onPress={ () => handleNavigate({ index, key: route.key, routeName: route.name, routeParams: route.params }) }
                    title={ descriptors[route.key]?.options.title || '' }
                    totalTabs={ state.routes.length }
                />
            )) }
        </View>
    );
}