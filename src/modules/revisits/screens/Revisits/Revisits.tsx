import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

/* Features */
import { INIT_REVISIT } from '../../features';

/* Components */
import { RevisitsList } from '../../components';
import { Fab } from '../../../ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { RevisitsTopTabsParamsList } from '../../interfaces';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

type RevisitsProps = MaterialTopTabScreenProps<RevisitsTopTabsParamsList>;

/**
 * This screen is responsible for grouping the components to show a list
 * of revisits according to the filter that is sent.
 *
 * @param {RevisitsProps} { route: RouteProp } - This is a params of TopTabNavigation
 * @return {JSX.Element} rendered component to show list of revisits
 */
const Revisits: FC<RevisitsProps> = ({ route }): JSX.Element => {
    const { navigate, addListener, removeListener, getState } = useNavigation();

    const { setSelectedRevisit, setRevisitsScreenHistory } = useRevisits();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

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

        navigate('AddOrEditRevisitScreen' as never);
    }

    /**
     * Effect to set revisitsScreenHistory when call focus event
     * in screen.
     */
    useEffect(() => {
        addListener('focus', () => {
            const navigationState = getState();
            if (!navigationState) return;
            setRevisitsScreenHistory(navigationState.routeNames[navigationState.index]);
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

            { (route.name === 'RevisitsScreen') && (
                <Fab
                    color={ colors.button }
                    icon={
                        <Icon
                            color={ colors.contentHeader }
                            name="add-circle-outline"
                            size={ 40 }
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
