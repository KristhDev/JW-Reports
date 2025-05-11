import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* DI */
import { timeAdapter } from '@config/di';

/* Screens */
import { FinishOrStartLessonModal } from '../FinishOrStartLessonModal';

/* Components */
import { InfoText, Link, Title } from '@ui/components';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useLessons } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This screen is responsible for grouping the components to
 * show the detail of a lesson.
 *
 * @return {JSX.Element} rendered component to show detail of a lesson
 */
const LessonDetail = (): JSX.Element => {
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { fontSizes } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { state: { selectedLesson } } = useLessons();
    const { translate } = useTranslation();

    const title = translate('screens.lessons.titles.courseLessonWith', {
        personName: selectedCourse.personName
    }).toUpperCase();

    const lessonStatus = (selectedLesson.done)
        ? translate('screens.lessons.status.taught')
        : translate('screens.lessons.status.toBeTaught');

    const lessonStatusText = translate('screens.lessons.labels.lessonStatus', {
        status: lessonStatus
    });

    const lessonStatusQuestion = (selectedLesson.done)
        ? translate('screens.lessons.questions.finish')
        : translate('screens.lessons.questions.reschedule');

    const analyzedText = (selectedLesson.done)
        ? translate('screens.lessons.labels.wasAnalyzed')
        : translate('screens.lessons.labels.itllAnalyzed');

    const nextVisit = timeAdapter.format(selectedLesson.nextLesson, 'LL');

    return (
        <>
            <ScrollView
                contentContainerStyle={ themeStyles.scrollView }
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ title }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={ themeStyles.publicationTextContainer }
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={ themeStyles.publicationText }
                />

                {/* Lesson status */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={{ ...themeStyles.detailSubTitle, marginBottom: 0 }}
                        testID="lesson-detail-status-text"
                    >
                        { lessonStatusText }
                    </Text >

                    <Link
                        onPress={ () => setShowFSModal(true) }
                        testID="lesson-detail-status-text-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        { lessonStatusQuestion }
                    </Link>
                </View>

                {/* Lesson description */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="lesson-detail-description-subtitle"
                    >
                        { analyzedText }
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="lesson-detail-description-text"
                    >
                        { selectedLesson.description }
                    </Text>
                </View>

                {/* Lesson create date */}
                <View style={ themeStyles.detailSection }>
                    <Text style={ themeStyles.detailSubTitle }>
                        { translate('forms.labels.date') }
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="lesson-detail-next-visit-text"
                    >
                        { nextVisit }
                    </Text>
                </View>

                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="lesson-detail-date-created-text"
                    >
                        { timeAdapter.format(selectedLesson.createdAt, 'DD/MM/YYYY') }
                    </Text>
                </View>
            </ScrollView>

            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => setShowFSModal(false) }
            />
        </>
    );
}

export default LessonDetail;