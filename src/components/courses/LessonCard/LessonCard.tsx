import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

/* Components */
import { Fab } from '../../ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { LessonCardProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for rendering part of the information of a
 * lesson in the form of a card
 * @param {LessonCardProps} props - { lesson, onDelete, onFinish }
 */
export const LessonCard: FC<LessonCardProps> = ({ lesson, onDelete, onFinish }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedLesson } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const nextVisit = dayjs(lesson.next_lesson);

    /**
     * When the user clicks on a lesson, the lesson is set as the selected lesson and the user is
     * navigated to the LessonDetailScreen.
     */
    const handleLessonDetail = () => {
        setSelectedLesson(lesson);
        navigate('LessonDetailScreen' as never);
    }

    /**
     * When the user clicks the edit button, close the modal, set the selected lesson to the current
     * lesson, and navigate to the AddOrEditLessonScreen.
     */
    const handleEdit = () => {
        setIsOpen(false);
        setSelectedLesson(lesson);
        navigate('AddOrEditLessonScreen' as never);
    }

    /**
     * The function takes a function as an argument and calls it.
     * @param onSelect - () => void
     */
    const handleSelect = (onSelect: () => void) => {
        setIsOpen(false);
        onSelect();
    }

    return (
        <TouchableRipple
            borderless
            onPress={ handleLessonDetail }
            rippleColor={ BUTTON_TRANSPARENT_COLOR }
            style={ styles.touchable }
        >
            <View style={{ ...styles.container, backgroundColor: colors.card }}>

                {/* Lesson status  */}
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    {
                        (lesson.done)
                            ? 'Clase impartida'
                            : `Clase para el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`
                    }
                </Text>

                {/* Text */}
                <Text style={{ ...styles.textDescription, color: colors.text }}>
                    { (lesson.description.length > 200) ? lesson.description.substring(0, 200) + '...' : lesson.description }
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
                    touchColor={ BUTTON_TRANSPARENT_COLOR }
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
                                    <Text
                                        style={{
                                            color: colors.text,
                                            ...styles.textMenuOpt
                                        }}
                                    >
                                        Editar
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onFinish) }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                { (lesson.done) ? 'Reprogramar' : 'Terminar clase' }
                            </Text>
                        </MenuOption>

                        <MenuOption onSelect={  () => handleSelect(onDelete) }>
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