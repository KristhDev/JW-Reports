import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import { Fab } from '../../ui';

import { useCourses, useTheme } from '../../../hooks';

import { LessonCardProps } from './interfaces';

import styles from './styles';

export const LessonCard: FC<LessonCardProps> = ({ lesson, onDelete, onFinish }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedLesson } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const nextVisit = dayjs(lesson.next_lesson);

    const handleCourseDetail = () => {
        setSelectedLesson(lesson);
        navigate('CourseDetailScreen' as never);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setSelectedLesson(lesson);
        navigate('AddOrEditLessonScreen' as never);
    }

    const handleSelect = (onSelect: () => void) => {
        setIsOpen(false);
        onSelect();
    }

    return (
        <TouchableRipple
            borderless
            onPress={ handleCourseDetail }
            rippleColor={ BUTTON_TRANSPARENT_COLOR }
            style={ styles.touchable }
        >
            <View style={{ ...styles.container, backgroundColor: colors.card }}>
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    {
                        (lesson.done)
                            ? 'Clase dada'
                            : `Clase para el ${ nextVisit.format('DD') } de ${ nextVisit.format('MMMM') } del ${ nextVisit.format('YYYY') }`
                    }
                </Text>

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

                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5, width: 220 }}>
                        {
                            (!lesson.done) && (
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
                            )
                        }

                        <MenuOption onSelect={ () => handleSelect(onFinish) }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                { (lesson.done) ? 'Reprogramar' : 'Terminada' }
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