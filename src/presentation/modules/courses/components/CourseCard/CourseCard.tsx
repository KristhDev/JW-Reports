import React, { FC, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '@lessons';

/* Interfaces */
import { CourseCardProps } from './interfaces';

/* Utils */
import { Characters } from '@utils';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering part of the information of a
 * course in the form of a card.
 *
 * @param {CourseCardProps} props The props to functionality of the component
 * @param {Course} props.course The course object that render in the card
 * @param {() => void} props.onActiveOrSuspend The function to active or suspend the course
 * @param {() => void} props.onDelete The function to delete the course
 * @param {() => void} props.onFinishOrStart The function to finish or start again the course
 * @return {JSX.Element} The JSX element representing the course card
 */
export const CourseCard: FC<CourseCardProps> = ({ course, onActiveOrSuspend, onDelete, onFinishOrStart }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const navigation = useNavigation();
    const { styles: themeStyles } = useStyles(themeStylesheet);
    const { styles, theme: { colors, fontSizes, margins } } = useStyles(stylesheet);

    const { setSelectedCourse } = useCourses();
    const { state: { selectedLesson }, setSelectedLesson } = useLessons();

    /**
     * When the user clicks on a course, set the selected course to the course that was clicked on and
     * navigate to the CourseDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleCourseDetail = (): void => {
        setSelectedCourse(course);
        navigation.navigate('CourseDetailScreen' as never);
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
        navigation.navigate('AddOrEditCourseScreen' as never);
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
            nextLesson: new Date().toString()
        });

        navigation.navigate('AddOrEditLessonScreen' as never);
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
        navigation.navigate('LessonsScreen' as never);
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
            onPress={ handleCourseDetail }
            style={{ ...styles.pressable, width: width - margins.sm }}
            testID="course-card-pressable"
        >
            <View style={ styles.cardContainer }>

                {/* Course status */}
                <Text
                    style={ styles.textStatus }
                    testID="course-card-status-text"
                >
                    { (course.finished)
                        ? 'Terminado'
                        : (course.suspended)
                            ? 'Suspendido'
                            : 'En Curso'
                    }
                </Text>

                {/* Name of person and study publication */}
                <Text
                    style={ styles.textName }
                    testID="course-card-name-text"
                >
                    { course.personName }
                </Text>

                <Text
                    style={ styles.textBook }
                    testID="course-card-publication-text"
                >
                    { course.publication }
                </Text>

                {/* Text of about person */}
                <Text
                    style={ styles.textDescription }
                    testID="course-card-about-text"
                >
                    { Characters.truncate(course.personAbout, 200) }
                </Text>

                <Fab
                    color={ 'transparent' }
                    icon={
                        <Ionicons
                            color={ colors.button }
                            name="ellipsis-vertical"
                            size={ (fontSizes.md - 3) }
                        />
                    }
                    onPress={ () => setIsOpen(true) }
                    style={ themeStyles.menuButton }
                    touchColor={ colors.buttonTransparent }
                />

                {/* Context menu */}
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ themeStyles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={ themeStyles.menuContainer(220) }>

                        {/* Show menu options then course.finished is false */}
                        {/* It is not possible edit, continue or suspend the course if this is finished */}
                        { (!course.finished) && (
                            <>
                                <MenuOption onSelect={ handleEdit }>
                                    <Text style={ themeStyles.menuItemText }>
                                        Editar
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onActiveOrSuspend) }>
                                    <Text style={ themeStyles.menuItemText }>
                                        { (course.suspended) ? 'Continuar' : 'Suspender' }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ handleLessonList }>
                            <Text style={ themeStyles.menuItemText }>
                                Clases
                            </Text>
                        </MenuOption>

                        {/* Show menu options then course.suspended is false */}
                        {/* It is not possible to finish or add lessons to the course if this is suspended */}
                        { (!course.suspended) && (
                            <>
                                <MenuOption onSelect={ handleAddClass }>
                                    <Text style={ themeStyles.menuItemText }>
                                        Agregar clase
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onFinishOrStart) }>
                                    <Text style={ themeStyles.menuItemText }>
                                        { (course.finished) ? 'Comenzar de nuevo' : 'Terminar' }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onDelete) }>
                            <Text style={ themeStyles.menuItemText }>
                                Eliminar
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </Pressable>
    );
}