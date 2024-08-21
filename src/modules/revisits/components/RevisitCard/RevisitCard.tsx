import React, { FC, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../../../ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { RevisitCardProps } from './interfaces';

/* Utils */
import { characters, date } from '../../../../utils';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering part of the information of a
 * revisit in the form of a card.
 *
 * @param {RevisitCardProps} props { onDelete: () => void, onPass: () => void, onRevisit: () => void, revisit: Revisit } - This a props
 * to functionality of the component
 * - onDelete: This is a function to delete the revisit
 * - onPass: This is a function to pass the revisit to course
 * - onRevisit: This is a function to mark as complete and revisit again
 * - revisit: This is a revisit object that render in the card
 * @return {JSX.Element} Rendered component to show the revisit
 */
export const RevisitCard: FC<RevisitCardProps> = ({ onDelete, onPass, onRevisit, revisit, screenToNavigate }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const navigation = useNavigation();
    const { styles: themeStyles } = useStyles(themeStylesheet);
    const { styles, theme: { colors, fontSizes, margins } } = useStyles(stylesheet);

    const { setSelectedRevisit } = useRevisits();

    const nextVisit = date.format(revisit.nextVisit, 'DD [de] MMMM [del] YYYY');

    /**
     * When the user clicks on a revisit, set the selected revisit to the revisit that was clicked on
     * and navigate to the RevisitDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleRevisitDetail = (): void => {
        setSelectedRevisit(revisit);
        navigation.navigate(screenToNavigate as never);
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
        navigation.navigate('AddOrEditRevisitScreen' as never);
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
            style={{ ...styles.pressable, width: width - margins.sm }}
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
                    { characters.truncate(revisit.about, 200) }
                </Text>

                <Fab
                    color="transparent"
                    icon={
                        <Icon
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