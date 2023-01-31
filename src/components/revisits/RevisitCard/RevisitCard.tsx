import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { Fab } from '../../ui';

import { useRevisits, useTheme } from '../../../hooks';

import { RevisitCardProps } from './interfaces';

import styles from './styles';

export const RevisitCard: FC<RevisitCardProps> = ({ onDelete, onRevisit, onPass, revisit }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedRevisit } = useRevisits();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const nextVisit = dayjs(revisit.next_visit);

    const handleRevisitDetail = () => {
        setSelectedRevisit(revisit);
        navigate('RevisitDetailScreen' as never);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setSelectedRevisit(revisit);
        navigate('AddOrEditRevisitScreen' as never);
    }

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
            <View
                style={{ ...styles.container, backgroundColor: colors.card }}
            >
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    {
                        (revisit.done)
                            ? 'Visita hecha'
                            : `Visitar el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`
                    }
                </Text>

                <Text style={{ ...styles.textName, color: colors.text }}>{ revisit.person_name }</Text>

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