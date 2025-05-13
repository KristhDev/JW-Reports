import React, { memo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* DI */
import { timeAdapter } from '@config/di';

/* Components */
import { DropdownMenu, DropdownMenuItem, Fab } from '@ui/components';

/* Hooks */
import { useLessons } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { LessonCardProps } from './interfaces';

/* Utils */
import { Characters } from '@utils';

/* Styles */
import { themeStylesheet } from '@theme/styles';
import { stylesheet } from './styles';

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
export const LessonCard = memo<LessonCardProps>(({ lesson, onNavigateDetail, onNavigateEdit, onClick, onDelete, onFinish }): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const { styles, theme: { colors, fontSizes } } = useStyles(stylesheet);
    const { styles: themeStyles, } = useStyles(themeStylesheet);

    const { setSelectedLesson } = useLessons();
    const { translate } = useTranslation();

    const nextVisit = translate('dates.lessonTo', { date: timeAdapter.format(lesson.nextLesson, timeAdapter.formats.LOCALE_LONG_DATE) });
    const classTaught = translate('cards.lessons.status.taught');

    const reprogramOrFinish = (lesson.done) 
        ? translate('cards.lessons.actions.reprogram') 
        : translate('cards.lessons.actions.finishLesson');

    /**
     * When the user clicks on a lesson, the lesson is set as the selected lesson and the user is
     * navigated to the LessonDetailScreen.
     *
     * @return {void} This function does not return any value.
     */
    const handleLessonDetail = (): void => {
        setSelectedLesson(lesson);
        onClick && onClick();
        onNavigateDetail();
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
        onNavigateEdit();
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

    const generateMenuItems = (): DropdownMenuItem[] => {
        let items: DropdownMenuItem[] = [];

        if (!lesson.done) {
            items.push({ label: translate('forms.actions.edit'), onPress: handleEdit });
        }

        items.push(
            { label: reprogramOrFinish, onPress: () => handleSelect(onFinish) },
            { label: translate('forms.actions.delete'), onPress: () => handleSelect(onDelete) }
        );

        return items;
    }

    return (
        <Pressable
            android_ripple={{
                color: colors.buttonTransparent,
                foreground: true
            }}
            onPress={ handleLessonDetail }
            style={ styles.pressable }
            testID="lesson-card-pressable"
        >
            <View style={ styles.cardContainer }>

                {/* Lesson status  */}
                <Text
                    style={ styles.textDate }
                    testID="lesson-card-status-text"
                >
                    { (lesson.done) ? classTaught : nextVisit }
                </Text>

                {/* Text */}
                <Text
                    style={ styles.textDescription }
                    testID="lesson-card-description-text"
                >
                    { Characters.truncate(lesson.description, 200) }
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

                {/* Menu context */}
                <DropdownMenu 
                    items={ generateMenuItems() }
                    onClose={ () => setIsOpen(false) }
                    open={ isOpen }
                />
            </View>
        </Pressable>
    );
}); 