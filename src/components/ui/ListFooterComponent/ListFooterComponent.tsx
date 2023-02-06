import React, { FC } from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { ListFooterComponentProps } from './interfaces';

/**
 * This component is responsible for displaying a loader when a certain
 * condition provided by the parent is met.
 * @param {ListFooterComponentProps} props { marginTopPlus: boolean, showLoader: boolean } - This is the props
 * for functionality of the component
 * - marginTopPlus: This a boolean to give more margin to the loader or not
 * - showLoader: This is a boolean to determine whether the loader should be shown or not
 */
export const ListFooterComponent: FC<ListFooterComponentProps> = ({ marginTopPlus, showLoader }) => {
    const { height } = useWindowDimensions();

    const { state: { colors } } = useTheme();

    return (
        <>
            { (showLoader) && (
                <ActivityIndicator
                    color={ colors.button }
                    size="large"
                    style={{ marginTop: height * ((marginTopPlus) ? 0.22 : 0.10)  }}
                />
            ) }
        </>
    )
}