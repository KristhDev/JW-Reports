import React, { FC } from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { ListFooterComponentProps } from './interfaces';

/**
 * This component is responsible for displaying a loader when a certain
 * condition provided by the parent is met.
 * @param {ListFooterComponentProps} props - { marginTopPlus, showLoader }
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