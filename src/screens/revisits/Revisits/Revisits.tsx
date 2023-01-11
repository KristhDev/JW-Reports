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

    const { setSelectedRevisit, setRevisitsScreenHistory } = useRevisits();
    const { state: { colors } } = useTheme();

    const handleNavigate = () => {
        setSelectedRevisit({
            id: '',
            user_id: '',
            person_name: '',
            about: '',
            address: '',
            photo: '',
            next_visit: new Date().toString(),
            done: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        navigate('AddOrEditRevisitScreen' as never);
    }

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

            {
                (route.name === 'RevisitsScreen') && (
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
                        onPress={ handleNavigate }
                        style={ themeStyles.fabBottomRight }
                        touchColor="rgba(0, 0, 0, 0.15)"
                    />
                )
            }
        </>
    );
}

export default Revisits;