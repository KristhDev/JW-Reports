import React, { FC, JSX } from 'react';
import { useStyles } from 'react-native-unistyles';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { DropdownMenuProps } from './interfaces';

import { themeStylesheet } from '@theme/styles';
import { Text } from 'react-native';

export const DropdownMenu: FC<DropdownMenuProps> = ({ items, onClose, open }): JSX.Element => {
    const { styles: themeStyles } = useStyles(themeStylesheet);

    return (
        <Menu
            onBackdropPress={ onClose }
            opened={ open }
            style={ themeStyles.menuPosition }
        >
            <MenuTrigger text="" />

            <MenuOptions optionsContainerStyle={ themeStyles.menuContainer(220) }>
                { items.map((item, index) => (
                    <MenuOption 
                        key={ `${ index }-${ item.label }` }
                        onSelect={ item.onPress }
                    >
                        <Text style={ themeStyles.menuItemText }>
                            { item.label }
                        </Text>
                    </MenuOption>
                )) }
            </MenuOptions>
        </Menu>
    );
}