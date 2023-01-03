import React, { useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../../ui';

import { useTheme } from '../../../hooks';

import styles from './styles';

export const RevisitCard = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { state: { colors, theme } } = useTheme();

    const desc = 'Nemo maxime vero vel non eos. Provident reprehenderit sit. Labore ea qui ab. Aut reiciendis consequatur aliquam est aut quod. Pariatur reprehenderit est fugit quia. Quasi et delectus consequatur ex dolorum pariatur autem rem. Nemo maxime vero vel non eos. Provident reprehenderit sit. Labore ea qui ab. Aut reiciendis consequatur aliquam est aut quod. Pariatur reprehenderit est fugit quia. Quasi et delectus consequatur ex dolorum pariatur autem rem.';

    return (
        <TouchableHighlight
            style={ styles.touchable }
            onPress={ () => console.log('card') }
            activeOpacity={ 0.9 }
            underlayColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.50)' : 'rgba(0, 0, 0, 0.70)' }
        >
            <View
                style={{ ...styles.container, backgroundColor: colors.bottom }}
            >
                <Text style={{ ...styles.textDate, color: colors.icon }}>03-marzo</Text>

                <Text style={{ ...styles.textName, color: colors.text }}>Nombre de la persona</Text>

                <Text style={{ ...styles.textDescription, color: colors.text }}>
                    { (desc.length > 200) ? desc.substring(0, 200) + '...' : desc }
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

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.bottom, borderRadius: 5 }}>
                        <MenuOption>
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
                                Compartir
                            </Text>
                        </MenuOption>

                        <MenuOption>
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