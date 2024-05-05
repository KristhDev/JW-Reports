import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

/* Interfaces */
import { FabProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for displaying a floating action
 * button to perform different actions in the app.
 *
 * @param {FabProps} props {
 *      color: string,
 *      icon: ReactNode,
 *      onPress: () => void,
 *      touchColor: string,
 *      style: StyleProp<ViewStyle>
 *      pressableStyle: StyleProp<ViewStyle>
 *  } - This is the props for functionality of the component
 * - color: This is the color of the fab
 * - icon: This is the icon of the fab
 * - onPress: This is a function to perform the action
 * - touchColor: This is the color of the touchable ripple
 * - style: This is the style of the fab, default is `undefined`
 * - pressableStyle: This is the style of the pressable, default is `undefined`
 * @return {JSX.Element} Return jsx element to render button
 */
export const Fab: FC<FabProps> = ({ color, icon, onPress, touchColor, style, pressableStyle }): JSX.Element => {
    return (
        <View style={[ styles.fabView, style ]}>
            <Pressable
                android_ripple={{
                    color: touchColor,
                    borderless: true
                }}
                onPress= { onPress }
                style={[
                    { ...styles.fab, backgroundColor: color },
                    pressableStyle
                ]}
                testID="fab-touchable"
            >
                { icon }
            </Pressable>
        </View>
    );
}