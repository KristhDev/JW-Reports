import React, { FC, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../../../ui';

/* Hooks */
import { useLessons } from '../../hooks';

/* Interfaces */
import { LessonCardProps } from './interfaces';

/* Utils */
import { date } from '../../../../utils';

/* Styles */
import stylesheet from './styles';

/**
 * This component is responsible for rendering part of the information of a
 * lesson in the form of a card.
 *
 * @param {LessonCardProps} props { lesson: Lesson, onDelete: () => void, onFinish: () => void } - This is a props
 * to functionality of the component
 * - lesson: This is a lesson object that render in the card
 * - onDelete: This is a function to delete the lesson
 * - onFinish: This is a function to finish the lesson
 * @return {JSX.Element} rendered component to show the lesson
 */
export const LessonCard: FC<LessonCardProps> = ({ lesson, screenToNavigate, onClick, onDelete, onFinish }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { setSelectedLesson } = useLessons();
    const { styles, theme: { colors, fontSizes, margins } } = useStyles(stylesheet);

    const nextVisit = date.format(lesson.nextLesson, 'DD [de] MMMM [del] YYYY');

    /**
     * When the user clicks on a lesson, the lesson is set as the selected lesson and the user is
     * navigated to the LessonDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleLessonDetail = (): void => {
        setSelectedLesson(lesson);
        onClick && onClick();
        navigate(screenToNavigate as never);
    }

    /**
     * When the user clicks the edit button, close the modal, set the selected lesson to the current
     * lesson, and navigate to the AddOrEditLessonScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleEdit = (): void => {
        setIsOpen(false);
        setSelectedLesson(lesson);
        navigate('AddOrEditLessonScreen' as never);
    }

    /**
     * The function takes a function as an argument and calls it.
     *
     * @param onSelect - () => void
     * @return {void} This function does not return any value.
     */
    const handleSelect = (onSelect: () => void): void => {
        setIsOpen(false);
        onSelect();
    }

    return (
        <Pressable
            android_ripple={{
                color: colors.buttonTransparent,
                foreground: true
            }}
            onPress={ handleLessonDetail }
            style={{ ...styles.pressable, width: width - margins.sm }}
            testID="lesson-card-pressable"
        >
            <View style={ styles.cardContainer }>

                {/* Lesson status  */}
                <Text
                    style={ styles.textDate }
                    testID="lesson-card-status-text"
                >
                    { (lesson.done)
                        ? 'Clase impartida'
                        : `Clase para el ${ nextVisit }`
                    }
                </Text>

                {/* Text */}
                <Text
                    style={ styles.textDescription }
                    testID="lesson-card-description-text"
                >
                    { (lesson.description.length > 200) ? lesson.description.substring(0, 200) + '...' : lesson.description }
                </Text>

                <Fab
                    color={ 'transparent' }
                    icon={
                        <Icon
                            color={ colors.button }
                            name="ellipsis-vertical"
                            size={ (fontSizes.md - 3) }
                        />
                    }
                    onPress={ () => setIsOpen(true) }
                    style={ styles.fab }
                    touchColor={ colors.buttonTransparent }
                />

                {/* Menu context */}
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5, width: 220 }}>

                        {/* Then lesson.done is false show this option */}
                        {/* The lesson can only be edited if lesson.done is false */}
                        { (!lesson.done) && (
                            <>
                                <MenuOption onSelect={ handleEdit }>
                                    <Text style={ styles.textMenuOpt }>
                                        Editar
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onFinish) }>
                            <Text style={ styles.textMenuOpt }>
                                { (lesson.done) ? 'Reprogramar' : 'Terminar clase' }
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={  () => handleSelect(onDelete) }>
                            <Text style={ styles.textMenuOpt }>
                                Eliminar
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </Pressable>
    );
}