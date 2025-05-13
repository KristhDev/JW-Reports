import { memo, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Features */
import { INIT_LESSON } from '@application/features/lessons';

/* Components */
import { DropdownMenu, DropdownMenuItem, Fab } from '@ui/components';

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

    const continueOrSuspendLabel = (course.suspended) 
        ?  translate('cards.courses.actions.continue')
        : translate('cards.courses.actions.suspended');

    const startOrFinishLabel = (course.finished) 
        ? translate('cards.courses.actions.startAgain')
        : translate('cards.courses.actions.finish')

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

    const generateMenuItems = (): DropdownMenuItem[] => {
        let items: DropdownMenuItem[] = [];

        if (!course.finished) {
            items.push(
                { label: translate('forms.actions.edit'), onPress: handleEdit },
                { label: continueOrSuspendLabel, onPress: () => handleSelect(onActiveOrSuspend) }
            );
        }

        items.push({ label: translate('cards.courses.actions.lessons'), onPress: handleLessonList });

        if (!course.suspended) {
            items.push(
                { label: translate('cards.courses.actions.addLesson'), onPress: handleAddLesson },
                { label: startOrFinishLabel, onPress: () => handleSelect(onFinishOrStart) }
            );
        }

        items.push({ label: translate('cards.actions.delete'), onPress: () => handleSelect(onDelete) });

        return items;
    }

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
                <DropdownMenu 
                    items={ generateMenuItems() }
                    onClose={ () => setIsOpen(false) }
                    open={ isOpen }
                />
            </View>
        </Pressable>
    );
});