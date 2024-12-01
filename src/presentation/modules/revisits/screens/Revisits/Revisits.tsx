import React, { FC, useCallback } from 'react';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Features */
import { INIT_REVISIT } from '@application/features';

/* Components */
import { RevisitsList } from '../../components';
import { Fab } from '@ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { RevisitsProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This screen is responsible for grouping the components to show a list
 * of revisits according to the filter that is sent.
 *
 * @param {RevisitsProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of revisits
 */
const Revisits: FC<RevisitsProps> = ({ emptyMessage, filter, segment, title }): JSX.Element => {
    const router = useRouter();
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

        router.navigate('/(app)/(tabs)/revisits/add-or-edit');
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
                filter={ filter }
                title={ title }
                emptyMessage={ emptyMessage }
            />

            { (segment === 'index') && (
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
