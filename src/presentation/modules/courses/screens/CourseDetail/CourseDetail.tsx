import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';

/* DI */
import { timeAdapter } from '@config/di';

/* Features */
import { INIT_LESSON } from '@application/features/lessons';

/* Screens */
import { ActiveOrSuspendCourseModal } from '../ActiveOrSuspendCourseModal';
import { FinishOrStartCourseModal }  from '../FinishOrStartCourseModal';

/* Components */
import { InfoText, Link, Title } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '@lessons/hooks';
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';
import { stylesheet } from './styles';

/**
 * This screen is responsible for grouping the components to
 * show the detail of a course.
 *
 * @return {JSX.Element} rendered component to show course
 */
const CourseDetail = (): JSX.Element => {
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const router = useRouter();

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { setSelectedLesson } = useLessons();
    const { translate } = useTranslation();

    const statusCourseText = (selectedCourse.finished)
        ? translate('cards.courses.status.finished')
        : (selectedCourse.suspended)
            ? translate('cards.courses.status.suspended')
            : translate('cards.courses.status.inCourse');

    const courseState = translate('screens.courses.labels.stateOfCourse', {
        state: statusCourseText
    });

    const aboutPersonText = translate('screens.revisits.labels.about', {
        person: selectedCourse.personName
    });

    const continueOrSuspendCourseText = (selectedCourse.suspended)
        ? translate('screens.courses.questions.continue')
        : translate('screens.courses.questions.suspend');

    const lastLessonTitle = (selectedCourse.lastLesson?.done) 
        ? translate('screens.courses.lastLessonTitles.lessonTaught') 
        : translate('screens.courses.lastLessonTitles.nextLesson', {
            date: timeAdapter.format(selectedCourse?.lastLesson?.nextLesson || new Date(), timeAdapter.formats.LOCALE_SHORT_DATE)
        });

    /**
     * When the user clicks the button, navigate to the AddOrEditLessonScreen screen and pass the
     * selectedLesson object as a prop.
     *
     * @return {void} This function does not return anything.
     */
    const handleAddLesson = (): void => {
        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });

        router.navigate('/(app)/(tabs)/courses/add-or-edit-lesson');
    }

    /**
     * The function handleLessonsList() is a function that navigates to the LessonsScreen.
     *
     * @return {void} This function does not return anything.
     */
    const handleLessonsList = (): void => {
        router.navigate('/(app)/(tabs)/courses/lessons');
    }

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
                    text={ selectedCourse.personName.toUpperCase() }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* Text publication */}
                <InfoText
                    containerStyle={ themeStyles.publicationTextContainer }
                    text={ selectedCourse.publication.toUpperCase() }
                    textStyle={ themeStyles.publicationText }
                />

                {/* Course status */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={{ ...themeStyles.detailSubTitle, marginBottom: 0 }}
                        testID="course-detail-status"
                    >
                        { courseState }
                    </Text>

                    { (!selectedCourse.finished) ? (
                        <Link
                            onPress={ () => setShowASModal(true) }
                            testID="course-detail-status-touchable"
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            { continueOrSuspendCourseText }
                        </Link>
                    ) : (
                        <Link
                            onPress={ () => setShowFSModal(true) }
                            testID="course-detail-status-touchable"
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            { translate('screens.courses.questions.startAgain') }
                        </Link>
                    ) }
                </View>

                {/* Text person about */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="course-detail-about-subtitle"
                    >
                        { aboutPersonText }
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="course-detail-about-text"
                    >
                        { selectedCourse.personAbout }
                    </Text>
                </View>

                {/* Text person address */}
                <View style={ themeStyles.detailSection }>
                    <Text style={[ themeStyles.detailSubTitle, styles.sectionTextColor ]}>
                        { translate('screens.revisits.labels.address') }
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="course-detail-address-text"
                    >
                        { selectedCourse.personAddress }
                    </Text>
                </View>

                {/* Course last lesson */}
                <View style={ themeStyles.detailSection }>
                    <Text style={ themeStyles.detailSubTitle }>
                        { translate('screens.courses.labels.lastLesson') }
                    </Text>

                    {/* Card of last lesson */}
                    { (selectedCourse?.lastLesson) ? (
                        <View style={ styles.cardContainer }>
                            <View style={{ backgroundColor: colors.header }}>
                                <Text
                                    style={ styles.cardHeaderText }
                                    testID="course-detail-last-lesson-status"
                                >
                                    { lastLessonTitle }
                                </Text>
                            </View>

                            <Text
                                style={ styles.cardContentText }
                                testID="course-detail-last-lesson-description"
                            >
                                { selectedCourse.lastLesson.description }
                            </Text>
                        </View>
                    ) : (
                        <Text
                            style={ themeStyles.detailText }
                            testID="course-detail-last-lesson-text"
                        >
                            { translate('screens.courses.messages.hasntLastLesson') }
                        </Text>
                    ) }

                    <Link
                        onPress={ handleLessonsList }
                        style={{ marginTop: margins.md }}
                        testID="course-detail-lessons-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        { translate('screens.courses.links.lessons') }
                    </Link>

                    <Link
                        onPress={ handleAddLesson }
                        style={{ marginTop: margins.xs }}
                        testID="course-detail-add-lesson-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        { translate('screens.courses.links.addLesson') }
                    </Link>
                </View>

                {/* Date of create course */}
                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="course-detail-text-date"
                    >
                        { timeAdapter.format(selectedCourse.createdAt, timeAdapter.formats.LOCALE_SHORT_DATE) }
                    </Text>
                </View>
            </ScrollView>

            <ActiveOrSuspendCourseModal
                isOpen={ showASModal }
                onClose={ () => setShowASModal(false) }
            />

            <FinishOrStartCourseModal
                isOpen={ showFSModal }
                onClose={ () => setShowFSModal(false) }
            />
        </>
    );
}

export default CourseDetail;