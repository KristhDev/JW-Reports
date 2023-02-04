import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { INIT_REVISIT } from '../../../features/revisits';

import { RevisitsList } from '../../../components/revisits';
import { Fab } from '../../../components/ui';

/* Hooks */
import { useRevisits, useTheme } from '../../../hooks';

/* Interfaces */
import { RevistsTopTabsParamsList } from '../../../interfaces/revisits';

/* Theme */
import { styles as themeStyles } from '../../../theme';

type RevisitsProps = MaterialTopTabScreenProps<RevistsTopTabsParamsList>;

/**
 * This screen is responsible for grouping the components to show a list
 * of revisits according to the filter that is sent.
 * @param {RevisitsProps} { route }
 */
const Revisits: FC<RevisitsProps> = ({ route }) => {
    const { navigate, addListener, removeListener, getState } = useNavigation();

    const { setSelectedRevisit, setRevisitsScreenHistory } = useRevisits();
    const { state: { colors } } = useTheme();

    /**
     * I'm going to set the selectedRevisit to the INIT_REVISIT object, but I'm going to override the
     * next_visit property with the current date.
     */
    const handleNavigate = () => {
        setSelectedRevisit({
            ...INIT_REVISIT,
            next_visit: new Date().toString()
        });

        navigate('AddOrEditRevisitScreen' as never);
    }

    /**
     * Effect to set revisitsScreenHistory when call focus event
     * in screen.
     */
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