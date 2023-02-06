import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

/* Components */
import { InfoText } from '../../ui';

/* Interfaces */
import { ListEmptyComponentProps } from './interfaces';

/**
 * This component is responsible for displaying a message when the list of
 * FlatList elements is empty and meets other conditions
 * @param {ListEmptyComponentProps} props { msg: string, showLoader: boolean } - This is the props
 * for functionality of the component
 * - msg: This is the message that will be displayed
 * - showLoader: This is a boolean to determine whether the loader should be shown or not
 */
export const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ msg, showLoader }) => {
    const { height } = useWindowDimensions();

    return (
        <>
            {
                (showLoader) && (
                    <InfoText
                        containerStyle={{ marginTop: height * 0.20 }}
                        text={ msg }
                    />
                )
            }
        </>
    );
}