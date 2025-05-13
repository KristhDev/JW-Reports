import { memo, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Features */
import { INIT_LESSON } from '@application/features/lessons';

/* Components */
import { Fab } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '@lessons/hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { CourseCardProps } from './interfaces';

/* Utils */
import { Characters } from '@utils';

/* Styles */
import { stylesheet } from './styles';
import { themeStylesheet } from '@theme/styles';

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
export const CourseCard = memo<CourseCardProps>(({ course, onActiveOrSuspend, onDelete, onFinishOrStart }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const router = useRouter();
    const { styles: themeStyles } = useStyles(themeStylesheet);
    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);

    const { setSelectedCourse } = useCourses();
    const { setSelectedLesson } = useLessons();
    const { translate } = useTranslation();

    /**
     * When the user clicks on a course, set the selected course to the course that was clicked on and
     * navigate to the CourseDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleCourseDetail = useCallback((): void => {
        setSelectedCourse(course);
        router.navigate('/(app)/(tabs)/courses/detail');
    }, [ course ]);

    /**
     * When the user clicks the edit button, close the modal, set the selected course to the course
     * that was clicked, and navigate to the AddOrEditCourseScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleEdit = useCallback((): void => {
        setIsOpen(false);
        setSelectedCourse(course);
        router.navigate('/(app)/(tabs)/courses/add-or-edit');
    }, [ course ]);

    /**
     * When the user clicks the button, the modal closes, the selected course is set to the course that
     * was clicked, the selected lesson is set to the lesson that was clicked, and the user is
     * navigated to the AddOrEditLessonScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleAddLesson = useCallback((): void => {
        setIsOpen(false);

        setSelectedCourse(course);
        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });

        router.navigate('/(app)/(tabs)/courses/lessons/add-or-edit');
    }, [ course ]);

    /**
     * When the user clicks on a course, the course is set as the selected course and the user is
     * navigated to the LessonsScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleLessonList = useCallback((): void => {
        setIsOpen(false);
        setSelectedCourse(course);
        router.navigate('/(app)/(tabs)/courses/lessons');
    }, [ course ]);

    /**
     * The function takes a function as an argument and calls it.
     *
     * @param onSelect - () => void
     * @return {void} This function does not return any value.
     */
    const handleSelect = useCallback((onSelect: () => void): void => {
        setIsOpen(false);
        onSelect();
    }, []);

    return (
        <Pressable
            android_ripple={{
                color: colors.buttonTransparent,
                foreground: true
            }}
            onPress={ handleCourseDetail }
            style={ styles.pressable }
            testID="course-card-pressable"
        >
            <View style={ styles.cardContainer }>

                {/* Course status */}
                <Text
                    style={ styles.textStatus }
                    testID="course-card-status-text"
                >
                    { (course.finished)
                        ? translate('cards.courses.status.finished')
                        : (course.suspended)
                            ? translate('cards.courses.status.suspended')
                            : translate('cards.courses.status.inCourse')
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
                    color="transparent"
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
                                        { translate('cards.actions.edit') }
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onActiveOrSuspend) }>
                                    <Text style={ themeStyles.menuItemText }>
                                        { (course.suspended) 
                                            ?  translate('cards.courses.actions.continue')
                                            : translate('cards.courses.actions.suspended')
                                        }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ handleLessonList }>
                            <Text style={ themeStyles.menuItemText }>
                                { translate('cards.courses.actions.lessons') }
                            </Text>
                        </MenuOption>

                        {/* Show menu options then course.suspended is false */}
                        {/* It is not possible to finish or add lessons to the course if this is suspended */}
                        { (!course.suspended) && (
                            <>
                                <MenuOption onSelect={ handleAddLesson }>
                                    <Text style={ themeStyles.menuItemText }>
                                        { translate('cards.courses.actions.addLesson') }
                                    </Text>
                                </MenuOption>

                                <MenuOption onSelect={ () => handleSelect(onFinishOrStart) }>
                                    <Text style={ themeStyles.menuItemText }>
                                        { (course.finished) 
                                            ? translate('cards.courses.actions.startAgain')
                                            : translate('cards.courses.actions.finish')
                                        }
                                    </Text>
                                </MenuOption>
                            </>
                        ) }

                        <MenuOption onSelect={ () => handleSelect(onDelete) }>
                            <Text style={ themeStyles.menuItemText }>
                                { translate('cards.actions.delete') }
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </Pressable>
    );
});