import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';

/* Features */
import { INIT_LESSON } from '@application/features';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Screens */
import { ActiveOrSuspendCourseModal } from '../ActiveOrSuspendCourseModal';
import { FinishOrStartCourseModal }  from '../FinishOrStartCourseModal';

/* Components */
import { CoursesStackNavigationType, InfoText, Link, Title } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '@lessons';


/* Styles */
import { themeStylesheet } from '@theme';
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

    const navigation = useNavigation<CoursesStackNavigationType>();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { selectedCourse } } = useCourses();
    const { setSelectedLesson } = useLessons();

    const statusCourseText = (selectedCourse.finished)
        ? 'Terminado'
        : (selectedCourse.suspended)
            ? 'Suspendido'
            : 'En curso';

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

        navigation.navigate('AddOrEditLessonScreen');
    }

    /**
     * The function handleLessonsList() is a function that navigates to the LessonsScreen.
     *
     * @return {void} This function does not return anything.
     */
    const handleLessonsList = (): void => {
        navigation.navigate('LessonsScreen');
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
                        Estado del curso: { statusCourseText }
                    </Text>

                    { (!selectedCourse.finished) ? (
                        <Link
                            onPress={ () => setShowASModal(true) }
                            testID="course-detail-status-touchable"
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            { (selectedCourse.suspended) ? '¿Continuar?' : '¿Suspender?' }
                        </Link>
                    ) : (
                        <Link
                            onPress={ () => setShowFSModal(true) }
                            testID="course-detail-status-touchable"
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            ¿Comenzar de nuevo?
                        </Link>
                    ) }
                </View>

                {/* Text person about */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="course-detail-about-subtitle"
                    >
                        Información de { selectedCourse.personName }:
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
                        Dirección:
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
                        Última clase:
                    </Text>

                    {/* Card of last lesson */}
                    { (selectedCourse?.lastLesson) && (
                        <View style={ styles.cardContainer }>
                            <View style={{ backgroundColor: colors.header }}>
                                <Text
                                    style={ styles.cardHeaderText }
                                    testID="course-detail-last-lesson-status"
                                >
                                    {
                                        (selectedCourse.lastLesson.done)
                                            ? 'Clase impartida'
                                            : `Próxima clase ${ Time.format(selectedCourse.lastLesson.nextLesson, 'DD/MM/YYYY') }`
                                        }
                                </Text>
                            </View>

                            <Text
                                style={ styles.cardContentText }
                                testID="course-detail-last-lesson-description"
                            >
                                { selectedCourse.lastLesson.description }
                            </Text>
                        </View>
                    ) }

                    <Link
                        onPress={ handleLessonsList }
                        style={{ marginTop: margins.md }}
                        testID="course-detail-lessons-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        Ver todas las clases
                    </Link>

                    <Link
                        onPress={ handleAddLesson }
                        style={{ marginTop: margins.xs }}
                        testID="course-detail-add-lesson-touchable"
                        textStyle={ themeStyles.sectionTextSize }
                    >
                        Agregar clase
                    </Link>
                </View>

                {/* Date of create course */}
                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="course-detail-text-date"
                    >
                        { Time.format(selectedCourse.createdAt, 'DD/MM/YYYY') }
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