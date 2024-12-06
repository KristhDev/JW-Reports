import { useRouter } from 'expo-router';

/* Constants */
import { coursesMessages, precursors } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_COURSE,
    addCourse as addCourseAction,
    addCourses as addCoursesAction,
    addLastLesson as addLastLessonAction,
    clearCourses as clearCoursesAction,
    removeCourse as removeCourseAction,
    removeCourses as removeCoursesAction,
    setCourseFilter as setCourseFilterAction,
    Pagination,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setCoursesScreenHistory as setCoursesScreenHistoryAction,
    setHasMoreCourses as setHasMoreCoursesAction,
    setIsCourseDeleting as setIsCourseDeletingAction,
    setIsCoursesExporting as setIsCoursesExportingAction,
    setIsCourseLoading as setIsCourseLoadingAction,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    updateCourse as updateCourseAction
} from '@application/features';

/* DTOs */
import { ActiveOrSuspendCourseDto, CreateCourseDto, FinishOrStartCourseDto, UpdateCourseDto } from '@domain/dtos';

/* Entities */
import { CourseEntity, LessonWithCourseEntity } from '@domain/entities';

/* Services */
import { CoursesService, LessonsService } from '@domain/services';

/* Templates */
import { PdfCoursesTemplate } from '@domain/templates';

/* Adapters */
import { ExternalStorage, PDF } from '@infrasturcture/adapters';

/* Modules */
import { useAuth } from '@auth';
import { useLessons } from '@lessons';
import { useStatus, useNetwork } from '@shared';

/* Interfaces */
import { CourseFilter, CourseFormValues, loadCoursesOptions } from '../interfaces';

/**
 * Hook to management courses of store with state and actions
 */
const useCourses = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { hasWifiConnection } = useNetwork();

    const state = useAppSelector(store => store.courses);
    const { user } = useAppSelector(store => store.auth);
    const { lastLesson } = useAppSelector(store => store.lessons);

    const { isAuthenticated } = useAuth();
    const { setStatus, setError } = useStatus();
    const { loadLastLesson } = useLessons();

    const addCourse = (course: CourseEntity) => dispatch(addCourseAction({ course }));
    const addCourses = (courses: CourseEntity[]) => dispatch(addCoursesAction({ courses }));
    const addLastLesson = (lesson: LessonWithCourseEntity) => dispatch(addLastLessonAction({ lesson }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourse = (id: string) => dispatch(removeCourseAction({ id }));
    const removeCourses = () => dispatch(removeCoursesAction());
    const setCourseFilter = (filter: CourseFilter) => dispatch(setCourseFilterAction({ filter }));
    const setCourses = (courses: CourseEntity[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setCoursesScreenHistory = (newScreen: string) => dispatch(setCoursesScreenHistoryAction({ newScreen }));
    const setHasMoreCourses = (hasMore: boolean) => dispatch(setHasMoreCoursesAction({ hasMore }));
    const setIsCourseDeleting = (isDeleting: boolean) => dispatch(setIsCourseDeletingAction({ isDeleting }));
    const setIsCoursesExporting = (isExporting: boolean) => dispatch(setIsCoursesExportingAction({ isExporting }));
    const setIsCourseLoading = (isLoading: boolean) => dispatch(setIsCourseLoadingAction({ isLoading }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: CourseEntity) => dispatch(setSelectedCourseAction({ course }));
    const updateCourseActionState = (course: CourseEntity) => dispatch(updateCourseAction({ course }));

    /**
     * Check if the course can be updated or not.
     * It will check if the selected course is empty or finished.
     * If the course is empty or finished, it will return false and
     * set the status with the appropiate message.
     * If the course can be updated, it will return true.
     * @param {string} unSelectedMsg - The message to be displayed if the course is not selected.
     * @param {() => void} [onError] - The function to be called when the course can not be updated.
     * @returns {boolean} - If the course can be updated or not.
     */
    const canAlterateCourse = (unSelectedMsg: string, onError?: () => void): boolean => {
        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onError && onError();
            setStatus({ code: 400, msg: unSelectedMsg });

            return false;
        }

        /* If the selectedCourse is finished it should not be updated */
        if (state.selectedCourse.finished) {
            onError && onError();
            setStatus({ code: 400, msg: coursesMessages.FINISHED });

            return false;
        }

        return true;
    }

    /**
     * Check if the selected course can be suspended or not.
     * It will check if the selected course is empty or suspended.
     * If the course is empty or suspended, it will return true and
     * set the status with the appropiate message.
     * If the course can not be suspended, it will return false.
     * @param {string} unSelectedMsg - The message to be displayed if the course is not selected.
     * @param {string} suspendMsg - The message to be displayed if the course is suspended.
     * @param {() => void} [onError] - The function to be called when the course can not be suspended.
     * @returns {boolean} - If the course can be suspended or not.
     */
    const isSelectedCourseSuspended = (unSelectedMsg: string, suspendMsg: string, onError?: () => void) => {
        if (state.selectedCourse.id === '') {
            onError && onError();
            setStatus({ code: 400, msg: unSelectedMsg });

            return true;
        }

        if (state.selectedCourse.suspended) {
            onError && onError();
            setStatus({ code: 400, msg: suspendMsg });

            return true;
        }

        return false;
    }

    /**
     * This function is responsible for activating or suspending a course.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const activeOrSuspendCourse = async (onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateCourse(coursesMessages.UNSELECTED, onFinish);
        if (!canAlterate) return;

        setIsCourseLoading(true);

        try {
            const activeOrSuspendDto = ActiveOrSuspendCourseDto.create(!state.selectedCourse.suspended);
            const course = await CoursesService.activeOrSuspend(state.selectedCourse.id, user.id, activeOrSuspendDto);

            const msg = (course.suspended) ? coursesMessages.SUSPENDED_SUCCESS : coursesMessages.RENEW_SUCCESS;
            updateCourseActionState(course);

            if (user.precursor === precursors.NINGUNO && lastLesson.courseId === state.selectedCourse.id) {
                addLastLesson({ ...lastLesson, course })
            }

            onFinish && onFinish();
            setStatus({ code: 200, msg });
        }
        catch (error) {
            setIsCourseLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * It deletes a course and all its lessons from the database.
     *
     * @param {boolean} back - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteCourse = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        const wifi = hasWifiConnection();
        if (!wifi) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateCourse(coursesMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsCourseDeleting(true);

        try {
            await LessonsService.deleteLessonsByCourseId(state.selectedCourse.id);
            await CoursesService.delete(state.selectedCourse.id, user.id);

            if (user.precursor === precursors.NINGUNO && lastLesson.courseId === state.selectedCourse.id) {
                await loadLastLesson();
            }

            removeCourse(state.selectedCourse.id);

            onFinish && onFinish();
            back && router.back();

            setSelectedCourse(INIT_COURSE);
            setStatus({ code: 200, msg: coursesMessages.DELETED_SUCCESS });
        }
        catch (error) {
            setIsCourseDeleting(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * This function exports all the courses of the current user to a PDF file that is saved in the device's downloads folder.
     * The file name is in the form "Cursos_de_<name>_<surname>.pdf".
     *
     * @param {boolean} showStatusMessage - Whether to show a status message when the export is finished.
     * @return {Promise<void>} This function does not return anything.
     */
    const exportCourses = async (showStatusMessage: boolean = true): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsCoursesExporting(true);

        try {
            const allCourses = await CoursesService.getAllByUserId(user.id);

            const coursesTemplate = PdfCoursesTemplate.generate({
                courses: allCourses,
                fullName: `${ user.name } ${ user.surname }`,
            });

            const fileName = `Cursos_de_${ user.name }_${ user.surname }`;
            const pdfPath = await PDF.writeFromHTML({ fileName, html: coursesTemplate, width: 480 });

            await ExternalStorage.moveFileOfInternalExtorage({
                filePath: pdfPath,
                mimeType: 'application/pdf'
            });

            if (showStatusMessage) setStatus({ code: 200, msg: coursesMessages.EXPORTED_SUCCESS });
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsCoursesExporting(false);
        }
    }

    /**
     * This function is to finish or start a course again.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const finishOrStartCourse = async (onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const courseSuspended = isSelectedCourseSuspended(
            coursesMessages.UNSELECTED,
            coursesMessages.UNSELECTED_FINISH_OR_START,
            onFinish
        );

        if (courseSuspended) return;

        setIsCourseLoading(true);

        try {
            const finishOrStartDto = FinishOrStartCourseDto.create(!state.selectedCourse.finished);
            const course = await CoursesService.finishOrStart(state.selectedCourse.id, user.id, finishOrStartDto);

            const msg = (course.finished) ? coursesMessages.FINISHED_SUCCESS : coursesMessages.RESTARTED_SUCCESS;
            updateCourseActionState(course);

            if (user.precursor === precursors.NINGUNO && lastLesson.courseId === state.selectedCourse.id) {
                addLastLesson({ ...lastLesson, course });
            }

            onFinish && onFinish();
            setStatus({ code: 200, msg });
        }
        catch (error) {
            setIsCourseLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * This function is to load the courses using the options that are passed by parameter, you can
     * load them for pagination or not.
     *
     * @param {loadCoursesOptions} { filter: CourseFilter, loadMore: boolean, refresh: boolean, search: string } - They are the options that are used to load the courses:
     * - filter: It is the filter of the courses to show them are: `all`, `active`, `suspended`, `finished`
     * - loadMore: This flag is used to add or set the courses that are requested, default is `false`
     * - refresh: This flag is to reset the pagination of the courses, default is `false`
     * - search: This is a search text to search courses, default is empty `string`
     * @return {Promise<void>} This function does not return anything.
     */
    const loadCourses = async ({ filter, loadMore = false, refresh = false, search = '' }: loadCoursesOptions): Promise<void> => {
        setCourseFilter(filter);

        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsCoursesLoading(true);

        try {
            const courses = await CoursesService.paginateByUserId(user.id, {
                filter,
                search,
                pagination: {
                    from: (refresh) ? 0 : state.coursesPagination.from,
                    to: (refresh) ? 9 : state.coursesPagination.to
                }
            });

            if (courses.length >= 10) {
                setCoursesPagination({
                    from: (refresh) ? 10 : state.coursesPagination.from + 10,
                    to: (refresh) ? 19 : state.coursesPagination.to + 10
                });
            }

            setHasMoreCourses(courses.length >= 10);
            (loadMore) ? addCourses(courses) : setCourses(courses);
        }
        catch (error) {
            setIsCoursesLoading(false);
            setError(error);
        }
    }

    /**
     * This function saves a course to the database and then navigates to the CoursesTopTabsNavigation
     * screen.
     *
     * @param {CourseFormValues} courseValues - This is a values for save course
     * @param {boolean} goBack - This parameter allows you to return to the previous screen, by default it is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const saveCourse = async (courseValues: CourseFormValues, goBack: boolean = false, onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        setIsCourseLoading(true);

        try {
            const createDto = CreateCourseDto.create({ ...courseValues, userId: user.id });
            const course = await CoursesService.create(createDto);

            addCourse(course);

            goBack && router.back();
            setStatus({ code: 201, msg: coursesMessages.ADDED_SUCCESS });
        }
        catch (error) {
            setIsCourseLoading(false);
            setError(error);
        }
        finally {
            onFinish && onFinish();
        }
    }

    /**
     * This function updates a course in the database and then updates the state with the updated
     * course.
     *
     * @param {CourseFormValues} courseValues - This is a values for update course
     * @return {Promise<void>} This function does not return anything.
     */
    const updateCourse = async (courseValues: CourseFormValues): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        if (state.selectedCourse.id === '') {
            setStatus({ code: 400, msg: coursesMessages.UNSELECTED_UPDATE });
            return;
        }

        setIsCourseLoading(true);

        try {
            const updateDto = UpdateCourseDto.create(courseValues);
            const course = await CoursesService.update(state.selectedCourse.id, user.id, updateDto);

            updateCourseActionState(course);

            if (user.precursor === precursors.NINGUNO && lastLesson.courseId === state.selectedCourse.id) {
                addLastLesson({ ...lastLesson, course });
            }

            router.back();
            setStatus({ code: 200, msg: coursesMessages.UPDATED_SUCCESS });
        }
        catch (error) {
            setIsCourseLoading(false);
            setError(error);
        }
    }

    return {
        state,

        // Actions
        clearCourses,
        removeCourses,
        setCoursesPagination,
        setCoursesScreenHistory,
        setRefreshCourses,
        setSelectedCourse,

        // Functions
        activeOrSuspendCourse,
        deleteCourse,
        exportCourses,
        finishOrStartCourse,
        loadCourses,
        saveCourse,
        updateCourse
    }
}

export default useCourses;