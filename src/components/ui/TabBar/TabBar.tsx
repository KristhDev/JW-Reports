import React, { FC, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabBarButton } from '../TabBarButton';

import { useTheme } from '../../../hooks';

import styles from './styles';

export const TabBar: FC<BottomTabBarProps> = ({ navigation, state, descriptors }) => {
    const [ hideTabBar, setHideTabBar ] = useState<boolean>(false);
    const { state: { colors } } = useTheme();

    const icons = [ 'home-outline', 'briefcase-outline', 'book-outline' ];

    const { navigate } = navigation;

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
                        {
                            state.routes.map((route, index) => (
                                <TabBarButton
                                    active={ state.index === index }
                                    key={ route.key }
                                    onPress={ () => navigate(route.name) }
                                    iconName={ icons[index] }
                                    title={ descriptors[route.key]?.options.title || '' }
                                    color={
                                        (state.index === index)
                                            ? descriptors[route.key]?.options.tabBarActiveTintColor
                                            : descriptors[route.key]?.options.tabBarInactiveTintColor
                                    }
                                />
                            ))
                        }
                    </View>
                )
            }
        </>
    );
}