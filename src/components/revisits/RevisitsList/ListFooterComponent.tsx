import React from 'react';
import { useWindowDimensions, ActivityIndicator } from 'react-native';

import { useRevisits, useTheme } from '../../../hooks';

export const ListFooterComponent = () => {
    const { height } = useWindowDimensions();

    const { state: { revisits, isRevisitsLoading } } = useRevisits();
    const { state: { colors } } = useTheme();

    return (
        <>
            {
                (isRevisitsLoading) && (
                    <ActivityIndicator
                        color={ colors.button }
                        size="large"
                        style={{ marginTop: height * ((revisits.length === 0) ? 0.22 : 0.10)  }}
                    />
                )
            }
        </>
    )
}