import React, { FC, JSX, useEffect, useRef } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { DashLoaderProps } from './interfaces';

import { stylesheet } from './styles';

export const DashLoader: FC<DashLoaderProps> = ({ dashItemWidth = 32, duration = 5000, width }): JSX.Element => {    
    const translateX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    const { styles } = useStyles(stylesheet);
    const dashArray = new Array(30).fill(null);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(translateX, {
                toValue: -windowWidth,
                duration,
                useNativeDriver: true,
            })
        );

        animation.start();

        return () => animation.stop();
    }, []);


    return (
        <View style={{ maxWidth: width }}>
            <View style={ styles.mask }>
                <Animated.View style={[ styles.dashRow(width), { transform: [{ translateX }] } ]}>
                    { dashArray.map((_, index) => (
                        <View 
                            key={ index } 
                            style={ styles.dash(dashItemWidth) } 
                        />
                    )) }
                </Animated.View>
            </View>
        </View>
    );
}