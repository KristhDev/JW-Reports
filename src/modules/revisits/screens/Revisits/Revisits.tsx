import React, { FC, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_REVISIT } from '../../features';

/* Components */
import { RevisitsList } from '../../components';
import { Fab } from '@ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { RevisitsTopTabsParamsList } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

type RevisitsProps = MaterialTopTabScreenProps<RevisitsTopTabsParamsList>;

/**
 * This screen is responsible for grouping the components to show a list
 * of revisits according to the filter that is sent.
 *
 * @param {RevisitsProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of revisits
 */
const Revisits: FC<RevisitsProps> = ({ route }): JSX.Element => {
    const navigation = useNavigation();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    const { setSelectedRevisit, setRevisitsScreenHistory } = useRevisits();

    /**
     * I'm going to set the selectedRevisit to the INIT_REVISIT object, but I'm going to override the
     * next_visit property with the current date.
     *
     * @return {void} This function does not return anything
     */
    const handleNavigate = (): void => {
        setSelectedRevisit({
            ...INIT_REVISIT,
            nextVisit: new Date().toString()
        });

        navigation.navigate('AddOrEditRevisitScreen' as never);
    }

    /**
     * Effect to set revisitsScreenHistory when call focus event
     * in screen.
     */
    useFocusEffect(
        useCallback(() => {
            const navigationState = navigation.getState();
            if (!navigationState) return;
            setRevisitsScreenHistory(navigationState.routeNames[navigationState.index]);
        }, [])
    );

    return (
        <>
            <RevisitsList
                filter={ route.params.filter }
                title={ route.params.title }
                emptyMessage={ route.params.emptyMessage }
            />

            { (route.name === 'RevisitsScreen') && (
                <Fab
                    color={ colors.button }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="add-circle-outline"
                            size={ fontSizes.xl }
                        />
                    }
                    onPress={ handleNavigate }
                    style={ themeStyles.fabBottomRight }
                    touchColor="rgba(0, 0, 0, 0.15)"
                />
            ) }
        </>
    );
}

export default Revisits;
