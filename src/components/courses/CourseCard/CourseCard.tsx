import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../../ui';

import { useCourses, useTheme } from '../../../hooks';

import { CourseCardProps } from './interfaces';

import styles from './styles';

export const CourseCard: FC<CourseCardProps> = ({ course, onActiveOrSuspend, onDelete, onFinishOrStart }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { selectedClass }, setSelectedClass, setSelectedCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleCourseDetail = () => {
        setSelectedCourse(course);
        navigate('CourseDetailScreen' as never);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setSelectedCourse(course);
        navigate('AddOrEditCourseScreen' as never);
    }

    const handleAddClass = () => {
        setIsOpen(false);

        setSelectedClass({
            ...selectedClass,
            next_class: new Date().toString()
        });

        navigate('AddOrEditClassScreen' as never);
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
                        (course.finished)
                            ? 'Terminado'
                            : (course.suspended)
                                ? 'Suspendido'
                                : 'En Curso'
                    }
                </Text>

                <Text style={{ ...styles.textName, color: colors.text }}>{ course.person_name }</Text>
                <Text style={{ ...styles.textBook, color: colors.icon }}>{ course.publication }</Text>

                <Text style={{ ...styles.textDescription, color: colors.text }}>
                    { (course.person_about.length > 200) ? course.person_about.substring(0, 200) + '...' : course.person_about }
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
                            (!course.finished) && (
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

                                    <MenuOption onSelect={ () => handleSelect(onActiveOrSuspend) }>
                                        <Text
                                            style={{
                                                color: colors.text,
                                                ...styles.textMenuOpt
                                            }}
                                        >
                                            { (course.suspended) ? 'Continuar' : 'Suspender' }
                                        </Text>
                                    </MenuOption>
                                </>
                            )
                        }

                        {
                            (!course.suspended) && (
                                <>
                                    <MenuOption onSelect={ handleAddClass }>
                                        <Text
                                            style={{
                                                color: colors.text,
                                                ...styles.textMenuOpt
                                            }}
                                        >
                                            Agregar clase
                                        </Text>
                                    </MenuOption>

                                    <MenuOption onSelect={ () => handleSelect(onFinishOrStart) }>
                                        <Text
                                            style={{
                                                color: colors.text,
                                                ...styles.textMenuOpt
                                            }}
                                        >
                                            { (course.finished) ? 'Comenzar de nuevo' : 'Terminar' }
                                        </Text>
                                    </MenuOption>
                                </>
                            )
                        }

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