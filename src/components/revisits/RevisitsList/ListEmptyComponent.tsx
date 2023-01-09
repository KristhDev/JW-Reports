import React from 'react';
import { useWindowDimensions } from 'react-native';

import { InfoText } from '../../ui';

import { useRevisits } from '../../../hooks';

export const ListEmptyComponent = () => {
    const { height } = useWindowDimensions();

    const { state: { revisits, isRevisitsLoading } } = useRevisits();

    return (
        <>
            {
                (!isRevisitsLoading && revisits.length === 0) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.22 }}
                        text="No haz agregado ninguna revisita."
                    />
                )
            }
        </>
    );
}