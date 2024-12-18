import React, { FC, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Components */
import { Fab } from '@ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { RevisitCardProps } from './interfaces';

/* Utils */
import { Characters } from '@utils';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '@theme';

/**
 * RevisitCard component represents a card displaying details of a revisit.
 * It provides options to navigate to the detail view, edit, delete, mark as
 * revisited, or pass to a course. It also displays the revisit date, person name,
 * and description.
 *
 * @param {RevisitCardProps} props - The props for the component including navigation
 * functions and revisit data.
 * @returns {JSX.Element} A Pressable component containing the revisit details and
 * action menu.
 */
export const RevisitCard: FC<RevisitCardProps> = ({ navigateToDetail, navigateToEdit, onDelete, onPass, onRevisit, revisit }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const { styles: themeStyles } = useStyles(themeStylesheet);
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    const { setSelectedRevisit } = useRevisits();

    const nextVisit = Time.format(revisit.nextVisit, 'DD [de] MMMM [del] YYYY');

    /**
     * When the user clicks on a revisit, set the selected revisit to the revisit that was clicked on
     * and navigate to the RevisitDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleRevisitDetail = (): void => {
        setSelectedRevisit(revisit);
        navigateToDetail();
    }

    /**
     * When the user clicks the edit button, the modal closes, the selected revisit is set to the
     * current revisit, and the user is navigated to the AddOrEditRevisitScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleEdit = (): void => {
        setIsOpen(false);
        setSelectedRevisit(revisit);
        navigateToEdit();
    }

    /**
     * The function takes a function as an argument and returns a function that calls the argument
     * function.
     *
     * @param {() => void} onAction - The function to call when the user clicks the action button.
     * @return {void} This function does not return any value.
     */
    const handleAction = (onAction: () => void): void => {
        setIsOpen(false);
        onAction();
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
                    { (revisit.done) ? 'Visita hecha' : `Visitar el ${ nextVisit }` }
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
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ themeStyles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions
                        optionsContainerStyle={ themeStyles.menuContainer(220) }
                    >
                        <MenuOption onSelect={ handleEdit }>
                            <Text style={ themeStyles.menuItemText }>
                                Editar
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onRevisit) }>
                            <Text style={ themeStyles.menuItemText }>
                                { (revisit.done) ? 'Volver a visitar' : 'Marcar como visitada' }
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onPass) }>
                            <Text style={ themeStyles.menuItemText }>
                                Pasar a curso bíblico
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onDelete) }>
                            <Text style={ themeStyles.menuItemText }>
                                Eliminar
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </Pressable>
    );
}