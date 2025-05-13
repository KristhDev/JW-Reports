import React, { memo, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* DI */
import { timeAdapter } from '@config/di';

/* Components */
import { DropdownMenu, DropdownMenuItem, Fab } from '@ui/components';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { RevisitCardProps } from './interfaces';

/* Utils */
import { Characters } from '@utils';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '@theme/styles';

export const RevisitCard = memo<RevisitCardProps>(({
    onDelete,
    onNavigateDetail,
    onNavigateEdit,
    onPass,
    onRevisit,
    revisit
}) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const { styles: themeStyles } = useStyles(themeStylesheet);
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    const { setSelectedRevisit } = useRevisits();
    const { translate } = useTranslation();

    const nextVisit = translate('dates.visit', { date: timeAdapter.format(revisit.nextVisit, timeAdapter.formats.LOCALE_LONG_DATE) });
    const visitDone = translate('cards.revisits.status.done');

    const returnOrMarkLabel = (revisit.done) 
        ? translate('cards.revisits.actions.returnToVisit') 
        : translate('cards.revisits.actions.markAsVisited');

    /**
     * When the user clicks on a revisit, set the selected revisit to the revisit that was clicked on
     * and navigate to the RevisitDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleRevisitDetail = useCallback((): void => {
        setSelectedRevisit(revisit);
        onNavigateDetail();
    }, [ revisit, onNavigateEdit ])

    /**
     * When the user clicks the edit button, the modal closes, the selected revisit is set to the
     * current revisit, and the user is navigated to the AddOrEditRevisitScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleEdit = useCallback((): void => {
        setIsOpen(false);
        setSelectedRevisit(revisit);
        onNavigateEdit();
    }, [ revisit, onNavigateEdit ]);

    /**
     * The function takes a function as an argument and returns a function that calls the argument
     * function.
     *
     * @param {() => void} onAction - The function to call when the user clicks the action button.
     * @return {void} This function does not return any value.
     */
    const handleAction = useCallback((onAction: () => void): void => {
        setIsOpen(false);
        onAction();
    }, []);

    const generateMenuItems = (): DropdownMenuItem[] => {
        let items: DropdownMenuItem[] = [
            { label: translate('forms.actions.edit'), onPress: handleEdit },
            { label: returnOrMarkLabel, onPress: () => handleAction(onRevisit) },
            { label: translate('cards.revisits.actions.proceedToBibleCourse'), onPress: () => handleAction(onPass) },
            { label: translate('forms.actions.delete'), onPress: () => handleAction(onDelete) }
        ];

        return items;
    }

    return (
        <Pressable
            android_ripple={{
                color: colors.buttonTransparent,
                foreground: true
            }}
            onPress={ handleRevisitDetail }
            style={ styles.pressable }
            testID="revisit-card-pressable"
        >
            <View style={ styles.cardContainer }>

                {/* Revisit status or date for next visit */}
                <Text
                    style={ styles.textDate }
                    testID="revisit-card-next-visit-text"
                >
                    { (revisit.done) ? visitDone : nextVisit }
                </Text>

                {/* Text person name */}
                <Text
                    style={ styles.textName }
                    testID="revisit-card-person-name-text"
                >
                    { revisit.personName }
                </Text>

                {/* Text about person */}
                <Text
                    style={ styles.textDescription }
                    testID="revisit-card-about-text"
                >
                    { Characters.truncate(revisit.about, 200) }
                </Text>

                <Fab
                    color="transparent"
                    icon={
                        <Ionicons
                            color={ colors.button }
                            name="ellipsis-vertical"
                            size={ (fontSizes.md - 3) }
                        />
                    }
                    onPress={ () => setIsOpen(true) }
                    style={ themeStyles.menuButton }
                    touchColor={ colors.buttonTransparent }
                />

                {/* Context menu */}
                <DropdownMenu 
                    items={ generateMenuItems() }
                    onClose={ () => setIsOpen(false) }
                    open={ isOpen }
                />
                    
            </View>
        </Pressable>
    );
});