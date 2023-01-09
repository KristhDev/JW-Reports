import React, { FC, useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { Fab } from '../../ui';

import { useRevisits, useTheme } from '../../../hooks';

import { RevisitCardProps } from './interfaces';

import styles from './styles';

export const RevisitCard: FC<RevisitCardProps> = ({ onDelete, revisit }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedRevisit } = useRevisits();
    const { state: { colors, theme } } = useTheme();

    const handleEdit = () => {
        setIsOpen(false);
        setSelectedRevisit(revisit);
        navigate('AddOrEditRevisitScreen' as never);
    }

    const handleDelete = () => {
        setIsOpen(false);
        onDelete();
    }

    return (
        <TouchableHighlight
            style={ styles.touchable }
            onPress={ () => console.log('card') }
            activeOpacity={ 0.9 }
            underlayColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.50)' : 'rgba(0, 0, 0, 0.70)' }
        >
            <View
                style={{ ...styles.container, backgroundColor: colors.card }}
            >
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    { `${ dayjs(revisit.next_visit).format('DD') }-${ dayjs(revisit.next_visit).format('MMMM') }`  }
                </Text>

                <Text style={{ ...styles.textName, color: colors.text }}>{ revisit.person_name }</Text>

                <Text style={{ ...styles.textDescription, color: colors.text }}>
                    { (revisit.about.length > 200) ? revisit.about.substring(0, 200) + '...' : revisit.about }
                </Text>

                <Fab
                    color={ 'transparent' }
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
                    touchColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'  }
                />

                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5 }}>
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

                        <MenuOption>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                Completar
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={ handleDelete }>
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
        </TouchableHighlight>
    );
}