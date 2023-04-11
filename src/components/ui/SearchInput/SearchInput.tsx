import React, { FC, useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { SearchInputProps } from './interfaces';

/* Styles */
import { styles as themeStyles } from '../../../theme';
import styles from './styles';

/**
 * This component is responsible for displaying a text box to perform searches
 * depending on the props that are sent to it.
 * @param {SearchInputProps} props { onClean: () => void, onSearch: () => void, refreshing: boolean, searchTerm: string } - This
 * is the props for functionality of the component
 * - onClean: This is the function to be called when the text box is cleared
 * - onSearch: This is the function to be called when onSubmitEditing is called
 * - refreshing: This is the value of the refreshing state
 * - searchTerm: This is the value of the search term
 */
export const SearchInput: FC<SearchInputProps> = ({ onClean, onSearch, refreshing, searchTerm }) => {
    const [ searchText, setSearchText ] = useState<string>(searchTerm);
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    /**
     * When the user clicks the clear button, clear the search text, call the onClean function, and set
     * the isFocused state to false.
     */
    const handleClearInput = () => {
        setSearchText('');
        onClean();
        setIsFocused(false);
    }

    /**
     * Effect to clear text input then change refreshing
     */
    useEffect(() => {
        if (refreshing) handleClearInput();
    }, [ refreshing ]);

    return (
        <View style={ styles.searchInputContainer }>

            {/* Search icon */}
            <Icon
                color={ colors.icon }
                name="ios-search"
                size={ 25 }
            />

            {/* Input container */}
            <View
                style={{
                    ...styles.inputContainer,
                    borderColor: (isFocused) ? colors.button : colors.icon
                }}
                testID="search-input-text-input-container"
            >

                {/* Text input */}
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
                    testID="search-input-text-input"
                    value={ searchText }
                />

                {/* Clear button */}
                <TouchableRipple
                    borderless
                    centered
                    disabled={ searchText.length === 0}
                    onPress={ handleClearInput }
                    rippleColor={ BUTTON_TRANSPARENT_COLOR }
                    style={ styles.cleanBtn }
                    testID="search-input-clear-btn"
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