import React, { FC, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Fab } from '../../../ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '../../../lessons';

/* Interfaces */
import { CourseCardProps } from './interfaces';

/* Styles */
import stylesheet from './styles';

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
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { setSelectedCourse } = useCourses();
    const { state: { selectedLesson }, setSelectedLesson } = useLessons();
    const { styles, theme: { colors, fontSizes, margins } } = useStyles(stylesheet);

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
            nextLesson: new Date().toString()
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
                    { (course.personAbout.length > 200) ? course.personAbout.substring(0, 200) + '...' : course.personAbout }
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

                {/* Context menu */}
                <Menu
                    onBackdropPress={ () => setIsOpen(false) }
                    opened={ isOpen }
                    style={ styles.menuPosition }
                >
                    <MenuTrigger text="" />

                    <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card, borderRadius: 5, width: 220 }}>

                        {/* Show menu options then course.finished is false */}
                        {/* It is not possible edit, continue or suspend the course if this is finished */}
                        { (!course.finished) && (
                            <>
                                <MenuOption onSelect={ handleEdit }>
                                    <Text style={ styles.textMenuOpt }>
                                        Editar
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onActiveOrSuspend) }>
                                    <Text style={ styles.textMenuOpt }>
                                        { (course.suspended) ? 'Continuar' : 'Suspender' }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ handleLessonList }>
                            <Text style={ styles.textMenuOpt }>
                                Clases
                            </Text>
                        </MenuOption>

                        {/* Show menu options then course.suspended is false */}
                        {/* It is not possible to finish or add lessons to the course if this is suspended */}
                        { (!course.suspended) && (
                            <>
                                <MenuOption onSelect={ handleAddClass }>
                                    <Text style={ styles.textMenuOpt }>
                                        Agregar clase
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onFinishOrStart) }>
                                    <Text style={ styles.textMenuOpt }>
                                        { (course.finished) ? 'Comenzar de nuevo' : 'Terminar' }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onDelete) }>
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