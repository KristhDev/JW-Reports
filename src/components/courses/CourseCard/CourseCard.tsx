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

export const CourseCard: FC<CourseCardProps> = ({ course, onCourse, onDelete }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { setSelectedCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleRevisitDetail = () => {
        // setSelectedCourse(course);
        // navigate('CourseDetailScreen' as never);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setSelectedCourse(course);
        navigate('AddOrEditCourseScreen' as never);
    }

    const handleRevist = () => {
        // setIsOpen(false);
        // onCourse();
    }

    const handleDelete = () => {
        setIsOpen(false);
        onDelete();
    }

    return (
        <TouchableRipple
            borderless
            onPress={ handleRevisitDetail }
            rippleColor={ BUTTON_TRANSPARENT_COLOR }
            style={ styles.touchable }
        >
            <View style={{ ...styles.container, backgroundColor: colors.card }}>
                <Text style={{ ...styles.textDate, color: colors.icon }}>
                    { (course.suspended) ? 'Suspendido' : 'En Curso' }
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

                        <MenuOption onSelect={ handleRevist }>
                            <Text
                                style={{
                                    color: colors.text,
                                    ...styles.textMenuOpt
                                }}
                            >
                                { (course.suspended) ? 'Continuar curso' : 'Suspender curso' }
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
        </TouchableRipple>
    );
}