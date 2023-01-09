import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { RevisitsList } from '../../../components/revisits';
import { Fab } from '../../../components/ui';

import { useRevisits, useTheme } from '../../../hooks';

import { RevistsTopTabsParamsList } from '../../../interfaces/revisits';

import themeStyles from '../../../theme/styles';

type RevisitsProps = MaterialTopTabScreenProps<RevistsTopTabsParamsList>;

const Revisits: FC<RevisitsProps> = ({ route }) => {
    const { navigate, addListener, removeListener, getState } = useNavigation();

    const { setRevisitsScreenHistory } = useRevisits();
    const { state: { colors } } = useTheme();

    useEffect(() => {
        addListener('focus', () => {
            const { index, routeNames } = getState();
            setRevisitsScreenHistory(routeNames[index]);
        });

        return () => {
            removeListener('focus', () => {});
        }
    }, []);

    return (
        <>
            <RevisitsList
                filter={ route.params.filter }
                title={ route.params.title }
                emptyMessage={ route.params.emptyMessage }
            />

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ () => navigate('AddOrEditRevisitScreen' as never) }
                style={ themeStyles.fabBottomRight }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Revisits;