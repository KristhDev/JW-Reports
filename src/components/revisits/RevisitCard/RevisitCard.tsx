import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

/* Components */
import { Fab } from '../../ui';

/* Hooks */
import { useRevisits, useTheme } from '../../../hooks';

/* Interfaces */
import { RevisitCardProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for rendering part of the information of a
 * revisit in the form of a card.
 * @param {RevisitCardProps} props { onDelete: () => void, onPass: () => void, onRevisit: () => void, revisit: Revisit } - This a props
 * to functionality of the component
 * - onDelete: This is a function to delete the revisit
 * - onPass: This is a function to pass the revisit to course
 * - onRevisit: This is a function to mark as complete and revisit again
 * - revisit: This is a revisit object that render in the card
 */
export const RevisitCard: FC<RevisitCardProps> = ({ onDelete, onPass, onRevisit, revisit }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedRevisit } = useRevisits();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const nextVisit = dayjs(revisit.next_visit);

    /**
     * When the user clicks on a revisit, set the selected revisit to the revisit that was clicked on
     * and navigate to the RevisitDetailScreen.
     */
    const handleRevisitDetail = () => {
        setSelectedRevisit(revisit);
        navigate('RevisitDetailScreen' as never);
    }

    /**
     * When the user clicks the edit button, the modal closes, the selected revisit is set to the
     * current revisit, and the user is navigated to the AddOrEditRevisitScreen.
     */
    const handleEdit = () => {
        setIsOpen(false);
        setSelectedRevisit(revisit);
        navigate('AddOrEditRevisitScreen' as never);
    }

    /**
     * The function takes a function as an argument and returns a function that calls the argument
     * function.
     * @param onAction - The function to call when the user clicks the action button.
     */
    const handleAction = (onAction: () => void) => {
        setIsOpen(false);
        onAction();
    }

    return (
        <TouchableRipple
            borderless
            onPress={ handleRevisitDetail }
            rippleColor={ BUTTON_TRANSPARENT_COLOR  }
            style={ styles.touchable }
        >
            <View style={{ ...styles.container, backgroundColor: colors.card }}>

                {/* Revisit status or date for next visit */}
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    {
                        (revisit.done)
                            ? 'Visita hecha'
                            : `Visitar el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`
                    }
                </Text>

                {/* Text person name */}
                <Text style={{ ...styles.textName, color: colors.text }}>{ revisit.person_name }</Text>

                {/* Text about person */}
                <Text style={{ ...styles.textDescription, color: colors.text }}>
                    { (revisit.about.length > 200) ? revisit.about.substring(0, 200) + '...' : revisit.about }
                </Text>

                <Fab
                    color="transparent"
                    icon={
                        <Icon
                            color={ colors.button }
                            name="ellipsis-vertical"
                            size={ 20 }
                            style={{ marginLeft: 2 }}
                        />
                    }
                    onPress={ () => setIsOpen(true) }
                    style={ styles.fab }
                    touchColor={ BUTTON_TRANSPARENT_COLOR }
                />

                {/* Context menu */}
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5, width: 220 }}>
                        <MenuOption onSelect={ handleEdit }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                Editar
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onRevisit) }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                { (revisit.done) ? 'Volver a visitar' : 'Marcar como visitada' }
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onPass) }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                Pasar a curso bíblico
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ () => handleAction(onDelete) }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                Eliminar
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </TouchableRipple>
    );
}