/* Config */
import {
    externalStorageAdapter,
    pdfAdapter,
    coursesService,
    lessonsService,
    messagesService,
    pdfCoursesTemplateService
} from '@config/di';

/* Constants */
import { precursors } from '@application/constants/utils';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_COURSE,
    addCourse as addCourseAction,
    addCourses as addCoursesAction,
    clearCourses as clearCoursesAction,
    removeCourse as removeCourseAction,
    removeCourses as removeCoursesAction,
    setCourseFilter as setCourseFilterAction,
    setCourses as setCoursesAction,
    setCoursesPagination as setCoursesPaginationAction,
    setHasMoreCourses as setHasMoreCoursesAction,
    setIsCourseDeleting as setIsCourseDeletingAction,
    setIsCoursesExporting as setIsCoursesExportingAction,
    setIsCourseLoading as setIsCourseLoadingAction,
    setIsCoursesLoading as setIsCoursesLoadingAction,
    setRefreshCourses as setRefreshCoursesAction,
    setSelectedCourse as setSelectedCourseAction,
    updateCourse as updateCourseAction
} from '@application/features/courses';

import { setLastLesson as setLastLessonAction } from '@application/features/lessons';

/* DTOs */
import { ActiveOrSuspendCourseDto, CreateCourseDto, FinishOrStartCourseDto, UpdateCourseDto } from '@domain/dtos';

/* Entities */
import { CourseEntity, LessonWithCourseEntity } from '@domain/entities';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { useLessons } from '@lessons/hooks';
import { useNetwork } from '@shared/hooks';
import { useToaster, useTranslation } from '@ui/hooks';

/* Interfaces */
import { CourseFilter, CourseFormValues, loadCoursesOptions } from '../interfaces';
import { UtilFunctions } from '@shared/interfaces';
import { Pagination } from '@ui/interfaces';

/**
 * Hook to management courses of store with state and actions
 */
const useCourses = () => {
    const coursesMessages = messagesService.coursesMessages;

    const dispatch = useAppDispatch();
    const { hasWifiConnection } = useNetwork();

    const state = useAppSelector(store => store.courses);
    const { user } = useAppSelector(store => store.auth);
    const { lastLesson } = useAppSelector(store => store.lessons);

    const { isAuthenticated } = useAuth();
    const { showError, showToast } = useToaster();
    const { loadLastLesson } = useLessons();
    const { translate } = useTranslation();

    const addCourse = (course: CourseEntity) => dispatch(addCourseAction({ course }));
    const addCourses = (courses: CourseEntity[]) => dispatch(addCoursesAction({ courses }));
    const clearCourses = () => dispatch(clearCoursesAction());
    const removeCourse = (id: string) => dispatch(removeCourseAction({ id }));
    const removeCourses = () => dispatch(removeCoursesAction());
    const setCourseFilter = (filter: CourseFilter) => dispatch(setCourseFilterAction({ filter }));
    const setCourses = (courses: CourseEntity[]) => dispatch(setCoursesAction({ courses }));
    const setCoursesPagination = (pagination: Pagination) => dispatch(setCoursesPaginationAction({ pagination }));
    const setHasMoreCourses = (hasMore: boolean) => dispatch(setHasMoreCoursesAction({ hasMore }));
    const setIsCourseDeleting = (isDeleting: boolean) => dispatch(setIsCourseDeletingAction({ isDeleting }));
    const setIsCourseLoading = (isLoading: boolean) => dispatch(setIsCourseLoadingAction({ isLoading }));
    const setIsCoursesExporting = (isExporting: boolean) => dispatch(setIsCoursesExportingAction({ isExporting }));
    const setIsCoursesLoading = (isLoading: boolean) => dispatch(setIsCoursesLoadingAction({ isLoading }));
    const setLastLesson = (lesson: LessonWithCourseEntity) => dispatch(setLastLessonAction({ lesson }));
    const setRefreshCourses = (refresh: boolean) => dispatch(setRefreshCoursesAction({ refresh }));
    const setSelectedCourse = (course: CourseEntity) => dispatch(setSelectedCourseAction({ course }));
    const updateCourseActionState = (course: CourseEntity) => dispatch(updateCourseAction({ course }));

    const instPrecursor = (user.precursor === precursors.NINGUNO);

    /**
     * Check if the course can be updated or not.
     * It will check if the selected course is empty or finished.
     * If the course is empty or finished, it will return false and
     * set the status with the appropiate message.
     * If the course can be updated, it will return true.
     *
     * @param {string} unSelectedMsg - The message to be displayed if the course is not selected.
     * @param {() => void} [onError] - The function to be called when the course can not be updated.
     * @returns {boolean} - If the course can be updated or not.
     */
    const canAlterateCourse = (unSelectedMsg: string, onError?: () => void): boolean => {
        /* Should not update if selectedCourse.id is an empty string */
        if (state.selectedCourse.id === '') {
            onError && onError();
            showToast(unSelectedMsg);

            return false;
        }

        /* If the selectedCourse is finished it should not be updated */
        if (state.selectedCourse.finished) {
            onError && onError();
            showToast(coursesMessages.FINISHED);

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
     *
     * @param {string} unSelectedMsg - The message to be displayed if the course is not selected.
     * @param {string} suspendMsg - The message to be displayed if the course is suspended.
     * @param {() => void} [onError] - The function to be called when the course can not be suspended.
     * @returns {boolean} - If the course can be suspended or not.
     */
    const isSelectedCourseSuspended = (unSelectedMsg: string, suspendMsg: string, onError?: () => void): boolean => {
        if (state.selectedCourse.id === '') {
            onError && onError();
            showToast(unSelectedMsg);

            return true;
        }

        if (state.selectedCourse.suspended) {
            onError && onError();
            showToast(suspendMsg);

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
            const course = await coursesService.activeOrSuspend(state.selectedCourse.id, user.id, activeOrSuspendDto);

            const msg = (course.suspended) ? coursesMessages.SUSPENDED_SUCCESS : coursesMessages.RENEW_SUCCESS;
            updateCourseActionState(course);

            if (instPrecursor && lastLesson.courseId === state.selectedCourse.id) {
                setLastLesson({ ...lastLesson, course })
            }

            setIsCourseLoading(false);
            onFinish && onFinish();
            showToast(msg);
        }
        catch (error) {
            setIsCourseLoading(false);
            onFinish && onFinish();

            showError(error);
        }
    }

    const clearSelectedCourse = (): void => {
        setSelectedCourse({ ...INIT_COURSE });
    }

    /**
     * It deletes a course and all its lessons from the database.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @param {Function} onSuccess - This callback executed when the process is finished (success)
     * @return {Promise<void>} This function does not return anything.
     */
    const deleteCourse = async ({ onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        const wifi = hasWifiConnection();
        if (!wifi) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateCourse(coursesMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsCourseDeleting(true);

        try {
            await lessonsService.deleteLessonsByCourseId(state.selectedCourse.id);
            await coursesService.delete(state.selectedCourse.id, user.id);

            if (instPrecursor && lastLesson.courseId === state.selectedCourse.id) {
                await loadLastLesson();
            }

            removeCourse(state.selectedCourse.id);

            onFinish && onFinish();
            onSuccess && onSuccess();

            setIsCourseDeleting(false);
            setSelectedCourse(INIT_COURSE);
            showToast(coursesMessages.DELETED_SUCCESS);
        }
        catch (error) {
            setIsCourseDeleting(false);
            onFinish && onFinish();

            showError(error);
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
            const allCourses = await coursesService.getAllByUserId(user.id);

            const coursesTemplate = pdfCoursesTemplateService.generate({
                courses: allCourses,
                fullName: `${ user.name } ${ user.surname }`,
            });

            const fileName = translate('pdf.fileNames.courses', { name: `${ user.name }_${ user.surname }` });
            const pdfPath = await pdfAdapter.writeFromHTML({ fileName, html: coursesTemplate, width: 480 });

            await externalStorageAdapter.moveFileOfInternalExtorage({
                filePath: pdfPath,
                mimeType: 'application/pdf'
            });

            if (showStatusMessage) showToast(coursesMessages.EXPORTED_SUCCESS);
        }
        catch (error) {
            showError(error);
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
            coursesMessages.UNSUSPENDED_FINISH_OR_START,
            onFinish
        );

        if (courseSuspended) return;

        setIsCourseLoading(true);

        try {
            const finishOrStartDto = FinishOrStartCourseDto.create(!state.selectedCourse.finished);
            const course = await coursesService.finishOrStart(state.selectedCourse.id, user.id, finishOrStartDto);

            const msg = (course.finished) ? coursesMessages.FINISHED_SUCCESS : coursesMessages.RESTARTED_SUCCESS;
            updateCourseActionState(course);

            if (instPrecursor && lastLesson.courseId === state.selectedCourse.id) {
                setLastLesson({ ...lastLesson, course });
            }

            setIsCourseLoading(false);
            onFinish && onFinish();
            showToast(msg);
        }
        catch (error) {
            setIsCourseLoading(false);
            onFinish && onFinish();

            showError(error);
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
            const courses = await coursesService.paginateByUserId(user.id, {
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

            if (loadMore) addCourses(courses);
            else setCourses(courses);
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsCoursesLoading(false);
        }
    }

    /**
     * This function saves a course to the database.
     *
     * @param {CourseFormValues} courseValues - This is a values for save course
     * @param {UtilFunctions} utils - 
     * @return {Promise<void>} This function does not return anything.
     */
    const saveCourse = async (courseValues: CourseFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(utils?.onFinish);
        if (!isAuth) return;

        setIsCourseLoading(true);

        try {
            const createDto = CreateCourseDto.create({ ...courseValues, userId: user.id });
            const course = await coursesService.create(createDto);

            addCourse(course);

            utils?.onSuccess && utils.onSuccess();
            showToast(coursesMessages.ADDED_SUCCESS);
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsCourseLoading(false);
            utils?.onFinish && utils.onFinish();
        }
    }

    /**
     * This function updates a course in the database and then updates the state with the updated
     * course.
     *
     * @param {CourseFormValues} courseValues - This is a values for update course
     * @param {UtilFunctions} utils - This object contains optional functions to be executed
     * @return {Promise<void>} This function does not return anything.
     */
    const updateCourse = async (courseValues: CourseFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        if (state.selectedCourse.id === '') {
            showToast(coursesMessages.UNSELECTED_UPDATE);
            return;
        }

        setIsCourseLoading(true);

        try {
            const updateDto = UpdateCourseDto.create(courseValues);
            const course = await coursesService.update(state.selectedCourse.id, user.id, updateDto);

            updateCourseActionState(course);
            if (course.id === state.selectedCourse.id) setSelectedCourse(course);

            const instPrecursor = (user.precursor === precursors.NINGUNO);

            if (instPrecursor && lastLesson.courseId === state.selectedCourse.id) {
                setLastLesson({ ...lastLesson, course });
            }

            utils?.onSuccess?.();
            showToast(coursesMessages.UPDATED_SUCCESS);
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsCourseLoading(false);
            utils?.onFinish?.();
        }
    }

    return {
        state,

        // Actions
        clearCourses,
        removeCourses,
        setCoursesPagination,
        setRefreshCourses,
        setSelectedCourse,

        // Functions
        activeOrSuspendCourse,
        clearSelectedCourse,
        deleteCourse,
        exportCourses,
        finishOrStartCourse,
        loadCourses,
        saveCourse,
        updateCourse
    }
}

export default useCourses;