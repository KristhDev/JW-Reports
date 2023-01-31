import React, { FC, useState } from 'react';
import { View, TextInput } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../../hooks';

import { SearchInputProps } from './interfaces';

import { styles as themeStyles } from '../../../theme';
import styles from './styles';

export const SearchInput: FC<SearchInputProps> = ({ onClean, onSearch, searchTerm }) => {
    const [ searchText, setSearchText ] = useState<string>(searchTerm);
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleClearInput = () => {
        setSearchText('');
        onClean();
        setIsFocused(false);
    }

    return (
        <View style={ styles.searchInputContainer }>
            <Icon
                color={ colors.icon }
                name="ios-search"
                size={ 25 }
            />

            <View
                style={{
                    ...styles.inputContainer,
                    borderColor: (isFocused) ? colors.button : colors.icon,
                }}
            >
                <TextInput
                    autoCorrect={ false }
                    cursorColor={ colors.button }
                    onBlur={ () => setIsFocused(false) }
                    onChangeText={ setSearchText }
                    onFocus={ () => setIsFocused(true) }
                    onSubmitEditing={ () => onSearch(searchText) }
                    placeholder="Buscar"
                    placeholderTextColor={ colors.icon }
                    returnKeyType="search"
                    style={{
                        ...themeStyles.formInput,
                        color: colors.inputText,
                        flex: 1
                    }}
                    value={ searchText }
                />

                <TouchableRipple
                    borderless
                    centered
                    disabled={ searchText.length === 0}
                    onPress={ handleClearInput }
                    rippleColor={ BUTTON_TRANSPARENT_COLOR }
                    style={ styles.cleanBtn }
                >
                    <Icon
                        color={ (searchText.length === 0) ? 'transparent' : colors.icon }
                        name="close-outline"
                        size={ 30 }
                    />
                </TouchableRipple>
            </View>
        </View>
    );
}