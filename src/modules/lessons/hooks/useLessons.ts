import { useNavigation } from '@react-navigation/native';

/* Supabase */
import { supabase } from '../../../config';

/* Adapters */
import { lessonAdapter } from '../adapters';

/* Features */
import { useAppDispatch, useAppSelector } from '../../../features';
import {
    addLastLesson,
    addLesson,
    addLessons as addLessonsAction,
    clearLessons as clearLessonsAction,
    INIT_LESSON,
    removeLesson,
    removeLessons as removeLessonsAction,
    setHasMoreLessons,
    setIsLastLessonLoading as setIsLastLessonLoadingAction,
    setIsLessonDeleting,
    setIsLessonLoading,
    setIsLessonsLoading as setIsLessonsLoadingAction,
    setLessons as setLessonsAction,
    setLessonsPagination as setLessonsPaginationAction,
    setSelectedLesson as setSelectedLessonAction,
    updateLesson as updateLessonAction
} from '../features';

/* Hooks */
import { addLastLessonInCourse, courseAdapter, INIT_COURSE, replaceLastLessonInCourse, updateLastLessonInCourse } from '../../courses';
import { useNetwork, useStatus } from '../../shared';

/* Interfaces */
import { Lesson, LessonEndpoint, LessonFormValues, LessonWithCourseEndpoint } from '../interfaces';
import { LoadResourcesOptions, Pagination } from '../../ui';

/* Utils */
import { date } from '../../../utils';

const useLessons = () => {
    const dispatch = useAppDispatch();
    const { goBack, navigate } = useNavigation();
    const { wifi } = useNetwork();

    const state = useAppSelector(store => store.lessons);
    const { user, isAuthenticated } = useAppSelector(store => store.auth);
    const { selectedCourse } = useAppSelector(store => store.courses);

    const { setUnauthenticatedError, setNetworkError, setStatus, setSupabaseError } = useStatus();

    const addLessons = (lessons: Lesson[]) => dispatch(addLessonsAction({ lessons }));
    const clearLessons = () => dispatch(clearLessonsAction());
    const removeLessons = () => dispatch(removeLessonsAction());
    const setIsLastLessonLoading = (isLoading: boolean) => dispatch(setIsLastLessonLoadingAction({ isLoading }));
    const setIsLessonsLoading = (isLoading: boolean) => dispatch(setIsLessonsLoadingAction({ isLoading }));
    const setLessons = (lessons: Lesson[]) => dispatch(setLessonsAction({ lessons }));
    const setLessonsPagination = (pagination: Pagination) => dispatch(setLessonsPaginationAction({ pagination }));
    const setSelectedLesson = (lesson: Lesson) => dispatch(setSelectedLessonAction({ lesson }));

    /**
     * It deletes a lesson from the database and updates the state of the app.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteLesson = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonDeleting({ isDeleting: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsLessonDeleting({ isDeleting: false }));
            });

            return;
        }

        /* Should not delete if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada para eliminar.'
            });

            return;
        }

        /* Cannot delete a class if the selectedCourse.user_id is different from user.id */
        if (selectedCourse.userId !== user.id) {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No tienes permiso para realizar está acción.'
            });

            return;
        }

        const { error, status } = await supabase.from('lessons')
            .delete()
            .eq('id', state.selectedLesson.id);

        const next = setSupabaseError(error, status, () => {
            onFinish && onFinish();
            dispatch(setIsLessonDeleting({ isDeleting: false }));
        });

        if (next) return;

        if (user.precursor === 'ninguno' && state.selectedLesson.id === state.lastLesson.id) {
            await loadLastLesson();
        }

        dispatch(removeLesson({ id: state.selectedLesson.id }));
        dispatch(replaceLastLessonInCourse({ lessonId: state.selectedLesson.id, lastLesson: state.lessons[0] }));
        onFinish && onFinish();
        back && goBack();

        setSelectedLesson({
            ...INIT_LESSON,
            nextLesson: new Date().toString()
        });

        setStatus({
            code: 200,
            msg: 'Has eliminado la clase correctamente.'
        });
    }

    /**
     * This function is to finish or start a lesson again.
     *
     * @param {Date} next_lesson - This is date of next lesson
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartLesson = async (next_lesson: Date, onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            return;
        }

        /* Should not update if selectedLesson.id is an empty string */
        if (state.selectedLesson.id === '') {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada.'
            });

            return;
        }

        /* If the selectedCourse is suspended or finished it should not be updated */
        if (selectedCourse.suspended || selectedCourse.finished) {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();

            setStatus({
                code: 400,
                msg: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .update({
                done: !state.selectedLesson.done,
                next_lesson: date.format(next_lesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedLesson.id)
            .eq('course_id', selectedCourse.id)
            .select<'*', LessonEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsLessonLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(updateLessonAction({ lesson: lessonAdapter(data!) }));
        dispatch(updateLastLessonInCourse({ lesson: lessonAdapter(data!) }));
        if ((user.precursor !== 'ninguno')) await loadLastLesson();

        onFinish && onFinish();
        dispatch(setIsLessonLoading({ isLoading: false }));

        const msg = (data!.done)
            ? 'Has terminado la clase correctamente.'
            : 'Has reprogrado la clase correctamente.'

        setStatus({ code: 200, msg });
    }

    /**
     * Loads the last lesson asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when the last lesson is loaded.
     */
    const loadLastLesson = async (): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        setIsLastLessonLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsLastLessonLoading(false));
            return;
        }

        const { data: dataCourses, error: errorCourses, status: statusCourses } = await supabase.from('courses')
            .select('id')
            .eq('user_id', user.id);

        const next = setSupabaseError(errorCourses, statusCourses, () => setIsLastLessonLoading(false));
        if (next) return;

        const { data, error, status } = await supabase.from('lessons')
            .select<'*, courses (*)', LessonWithCourseEndpoint>('*, courses (*)')
            .in('course_id', [ dataCourses!.map(({ id }) => id) ])
            .order('next_lesson', { ascending: false })
            .limit(1)
            .single();

        const nextLesson = setSupabaseError(error, status, () => setIsLastLessonLoading(false));
        if (nextLesson) return;

        dispatch(addLastLesson({
            lesson: (data)
                ? { ...lessonAdapter(data!), course: courseAdapter(data!.courses) }
                : { ...INIT_LESSON, course: INIT_COURSE }
        }));
    }

    /**
     * This function is to load the lessons using the options that are passed by parameter, you can
     * load them for pagination or not.
     *
     * @param {LoadResourcesOptions} { loadMore: boolean, refresh: boolean, search: string } - They are the options that are used to load the lessons:
     * - loadMore: This flag is used to add or set the lessons that are requested, default is `false`
     * - refresh: This flag is to reset the pagination of the lessons, default is `false`
     * - search: This is a search text to search lessons, default is empty `string`
     * @return {Promise<void>} This function does not return anything.
     */
    const loadLessons = async ({ loadMore = false, refresh = false, search = '' }: LoadResourcesOptions): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        setIsLessonsLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsLessonsLoading(false));
            return;
        }

         /* Should not update if selectedCourse .id is an empty string */
        if (selectedCourse.id === '') {
            setIsLessonsLoading(false);

            setStatus({
                code: 400,
                msg: 'No hay un curso seleccionado.'
            });

            return;
        }

        const lessonsPromise = supabase.from('lessons')
            .select<'*', LessonEndpoint>()
            .eq('course_id', selectedCourse.id);

        if (search.trim().length > 0) lessonsPromise.ilike('description', `%${ search }%`);

        lessonsPromise.order('next_lesson', { ascending: false })
            .range(
                (refresh) ? 0 : state.lessonsPagination.from,
                (refresh) ? 9 : state.lessonsPagination.to
            );

        const { data, error, status } = await lessonsPromise;

        const next = setSupabaseError(error, status, () => setIsLessonsLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setLessonsPagination({
                from: (refresh) ? 10 : state.lessonsPagination.from + 10,
                to: (refresh) ? 19 : state.lessonsPagination.to + 10
            });
        }

        const lessons = data!.map(lessonAdapter);
        dispatch(setHasMoreLessons({ hasMore: (data!.length >= 10) }));

        if (loadMore) addLessons(lessons);
        else setLessons(lessons);
    }

    /**
     * This function saves a lesson to the database and then navigates to the LessonsScreen.
     *
     * @param {LessonFormValues} lessonValues - This is a values for save lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const saveLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .insert({
                course_id: selectedCourse.id,
                description: lessonValues.description,
                next_lesson: date.format(lessonValues.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .select<'*', LessonEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => dispatch(setIsLessonLoading({ isLoading: false })));
        if (next) return;

        const lesson = lessonAdapter(data!);
        dispatch(addLastLessonInCourse({ courseId: selectedCourse.id, lastLesson: lesson }));

        if (state.lessons.length > 0) dispatch(addLesson({ lesson }));
        else dispatch(setIsLessonLoading({ isLoading: false }));

        if (user.precursor === 'ninguno') await loadLastLesson();

        setStatus({
            code: 201,
            msg: 'Has agregado una clase al curso correctamente.'
        });

        navigate('LessonsScreen' as never);
    }

    /**
     * It updates a lesson in the database and then updates the state with the updated lesson.
     *
     * @param {LessonFormValues} lessonValues - This is a values for update lesson
     * @return {Promise<void>} This function does not return anything.
     */
    const updateLesson = async (lessonValues: LessonFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsLessonLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsLessonLoading({ isLoading: false }));
            });

            return;
        }

        if (state.selectedLesson.id === '') {
            dispatch(setIsLessonLoading({ isLoading: false }));

            setStatus({
                code: 400,
                msg: 'No hay una clase seleccionada para actualizar.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('lessons')
            .update({
                description: lessonValues.description,
                next_lesson: date.format(lessonValues.nextLesson, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedLesson.id)
            .eq('course_id', selectedCourse.id)
            .select<'*', LessonEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => dispatch(setIsLessonLoading({ isLoading: false })));
        if (next) return;

        const lesson = lessonAdapter(data!);

        dispatch(updateLastLessonInCourse({ lesson }));
        dispatch(updateLessonAction({ lesson }));

        dispatch(setIsLessonLoading({ isLoading: false }));

        setStatus({
            code: 200,
            msg: 'Has actualizado la clase correctamente.'
        });

        goBack();
    }

    return {
        state,

        // Actions
        clearLessons,
        removeLessons,
        setLessonsPagination,
        setSelectedLesson,

        // Functions
        deleteLesson,
        finishOrStartLesson,
        loadLastLesson,
        loadLessons,
        saveLesson,
        updateLesson,
    }
}

export default useLessons;