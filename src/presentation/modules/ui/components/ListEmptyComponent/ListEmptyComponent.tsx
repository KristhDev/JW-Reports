import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

/* Components */
import { InfoText } from '../..';

/* Interfaces */
import { ListEmptyComponentProps } from './interfaces';

/**
 * This component is responsible for displaying a message when the list of
 * FlatList elements is empty and meets other conditions
 *
 * @param {ListEmptyComponentProps} props { msg: string, showMsg: boolean } - This is the props
 * for functionality of the component
 * - msg: This is the message that will be displayed
 * - showMsg: This is a boolean to determine whether the message should be shown or not
 * @return {JSX.Element} Return jsx element to render a list empty message
 */
export const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ msg, showMsg }): JSX.Element => {
    const { height } = useWindowDimensions();

    return (
        <>
            { (showMsg) && (
                <InfoText
                    containerStyle={{ marginTop: height * 0.20 }}
                    text={ msg }
                />
            ) }
        </>
    );
}