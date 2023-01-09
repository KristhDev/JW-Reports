import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { InfoText } from '../../ui';

import { useRevisits } from '../../../hooks';

import { ListEmptyComponentProps } from './interfaces';

export const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ msg }) => {
    const { height } = useWindowDimensions();

    const { state: { revisits, isRevisitsLoading } } = useRevisits();

    return (
        <>
            {
                (!isRevisitsLoading && revisits.length === 0) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.22 }}
                        text={ msg }
                    />
                )
            }
        </>
    );
}