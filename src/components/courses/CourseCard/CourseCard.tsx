import React, { FC, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../../ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { CourseCardProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component is responsible for rendering part of the information of a
 * course in the form of a card.
 *
 * @param {CourseCardProps} props { course: Course, onActiveOrSuspend: () => void, onDelete: () =>, onFinishOrStart: () => void } - This a props
 * to functionality of the component
 * - course: Its course object that render in the card
 * - onActiveOrSuspend: Function to active or suspend the course
 * - onDelete: Function to delete the course
 * - onFinishOrStart: Function to finish or start again the course
 * @return {JSX.Element} rendered component to show the course
 */
export const CourseCard: FC<CourseCardProps> = ({ course, onActiveOrSuspend, onDelete, onFinishOrStart }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { selectedLesson }, setSelectedLesson, setSelectedCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    /**
     * When the user clicks on a course, set the selected course to the course that was clicked on and
     * navigate to the CourseDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleCourseDetail = (): void => {
        setSelectedCourse(course);
        navigate('CourseDetailScreen' as never);
    }

    /**
     * When the user clicks the edit button, close the modal, set the selected course to the course
     * that was clicked, and navigate to the AddOrEditCourseScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleEdit = (): void => {
        setIsOpen(false);
        setSelectedCourse(course);
        navigate('AddOrEditCourseScreen' as never);
    }

    /**
     * When the user clicks the button, the modal closes, the selected course is set to the course that
     * was clicked, the selected lesson is set to the lesson that was clicked, and the user is
     * navigated to the AddOrEditLessonScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleAddClass = (): void => {
        setIsOpen(false);

        setSelectedCourse(course);
        setSelectedLesson({
            ...selectedLesson,
            next_lesson: new Date().toString()
        });

        navigate('AddOrEditLessonScreen' as never);
    }

    /**
     * When the user clicks on a course, the course is set as the selected course and the user is
     * navigated to the LessonsScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleLessonList = (): void => {
        setIsOpen(false);
        setSelectedCourse(course);
        navigate('LessonsScreen' as never);
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
        <TouchableRipple
            borderless
            onPress={ handleCourseDetail }
            rippleColor={ BUTTON_TRANSPARENT_COLOR }
            style={{ ...styles.touchable, width: width - 16 }}
            testID="course-card-touchable"
        >
            <View style={{ ...styles.container, backgroundColor: colors.card }}>

                {/* Course status */}
                <Text
                    style={{ ...styles.textDate, color: colors.icon }}
                    testID="course-card-status-text"
                >
                    {
                        (course.finished)
                            ? 'Terminado'
                            : (course.suspended)
                                ? 'Suspendido'
                                : 'En Curso'
                    }
                </Text>

                {/* Name of person and study publication */}
                <Text
                    style={{ ...styles.textName, color: colors.text }}
                    testID="course-card-name-text"
                >
                    { course.personName }
                </Text>

                <Text
                    style={{ ...styles.textBook, color: colors.icon }}
                    testID="course-card-publication-text"
                >
                    { course.publication }
                </Text>

                {/* Text of about person */}
                <Text
                    style={{ ...styles.textDescription, color: colors.text }}
                    testID="course-card-about-text"
                >
                    { (course.personAbout.length > 200) ? course.personAbout.substring(0, 200) + '...' : course.personAbout }
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

                {/* Context menu */}
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5, width: 220 }}>

                        {/* Show menu options then course.finished is false */}
                        {/* It is not possible edit, continue or suspend the course if it is finished */}
                        { (!course.finished) && (
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
                        ) }

                        <MenuOption onSelect={ handleLessonList }>
                                <Text
                                    style={{
                                        color: colors.text,
                                        ...styles.textMenuOpt
                                    }}
                                >
                                    Clases
                                </Text>
                            </MenuOption>

                        {/* Show menu options then course.suspended is false */}
                        {/* It is not possible to finish or add lessons to the course if it is suspended */}
                        { (!course.suspended) && (
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
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onDelete) }>
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