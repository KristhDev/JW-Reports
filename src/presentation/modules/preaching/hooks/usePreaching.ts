import { useNavigation } from '@react-navigation/native';

/* Constants */
import { authMessages, preachingMessages } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_PREACHING,
    addPreaching as addPreachingAction,
    clearPreaching as clearPreachingAction,
    removePreaching as removePreachingAction,
    setIsPreachingDeleting as setIsPreachingDeletingAction,
    setIsPreachingLoading as setIsPreachingLoadingAction,
    setIsPreachingsExporting as setIsPreachingsExportingAction,
    setIsPreachingsLoading as setIsPreachingsLoadingAction,
    setPreachings as setPreachingsAction,
    setSelectedDate as setSelectedDateAction,
    setSelectedPreaching as setSelectedPreachingAction,
    updatePreaching as updatePreachingAction
} from '@application/features';

/* Dtos */
import { CreatePreachingDto, UpdatePreachingDto } from '@domain/dtos';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Services */
import { PreachingReportService, PreachingService } from '@domain/services';

/* Adapters */
import { FileSystem, PDF, Time } from '@infrasturcture/adapters';

/* Hooks */
import { useAuth } from '@auth';
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { PreachingFormValues } from '../interfaces';
import { PdfPreachingsTemplate } from '@domain/templates';

/**
 * Hook to management preaching of store with state and actions
 */
const usePreaching = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const state = useAppSelector(store => store.preaching);
    const { user } = useAppSelector(store => store.auth);

    const { isAuthenticated } = useAuth();
    const { setStatus, setError } = useStatus();
    const { hasWifiConnection } = useNetwork();

    const addPreaching = (preaching: PreachingEntity) => dispatch(addPreachingAction({ preaching }));
    const removePreaching = (id: string) => dispatch(removePreachingAction({ id }));
    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setIsPreachingsExporting = (isExporting: boolean) => dispatch(setIsPreachingsExportingAction({ isExporting }));
    const setIsPreachingLoading = (isLoading: boolean) => dispatch(setIsPreachingLoadingAction({ isLoading }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setPreachings = (preachings: PreachingEntity[]) => dispatch(setPreachingsAction({ preachings }));
    const setSelectedPreaching = (preaching: PreachingEntity) => dispatch(setSelectedPreachingAction({ preaching }));
    const setIsPreachingDeleting = (isDeleting: boolean) => dispatch(setIsPreachingDeletingAction({ isDeleting }));
    const updatePreachingState = (preaching: PreachingEntity) => dispatch(updatePreachingAction({ preaching }));

    /**
     * Resets the selected preaching to the initial state with the current date
     * and the current time
     *
     * @return {void} This function does not return anything
     */
    const resetSelectedPreaching = (): void => {
        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            initHour: new Date().toString(),
            finalHour: new Date().toString()
        });
    }

    /**
     * This function checks if the selected preaching can be altered.
     * If there is no selected preaching or the user does not own the preaching, it returns false.
     *
     * @param {string} unSelectMsg - The message to display if no preaching is selected.
     * @param {() => void} onFinish - The callback function to execute when the check is finished.
     * @returns {boolean} Returns true if the preaching can be altered, otherwise false.
     */
    const canAlteratePreaching = (unSelectMsg: string, onFinish?: () => void): boolean => {
        if (state.seletedPreaching.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: unSelectMsg });

            return false;
        }

        if (state.seletedPreaching.userId !== user.id) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.UNAUTHORIZED });

            return false;
        }

        return true;
    }

    /**
     * This function is to delete a preaching day and return to the previous screen.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deletePreaching = async (onFinish?: () => void): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlteratePreaching(preachingMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsPreachingDeleting(true);

        try {
            await PreachingService.delete(state.seletedPreaching.id, user.id);
            removePreaching(state.seletedPreaching.id);

            setIsPreachingDeleting(false);
            onFinish && onFinish();

            navigation.goBack();

            resetSelectedPreaching();
            setStatus({ code: 200, msg: preachingMessages.DELETED_SUCCESS });
        }
        catch (error) {
            setIsPreachingDeleting(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * Export all preachings to a PDF file and save it to the user's download directory.
     *
     * @param {boolean} showStatusMessage - If true, it will show a status message to the user.
     * @return {Promise<void>} This function does not return anything.
     */
    const exportPreachings = async (showStatusMessage: boolean = true): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsPreachingsExporting(true);

        try {
            const allPreachings = await PreachingService.getAllByUserId(user.id);

            const preachingsGrouped = PreachingReportService.groupByMonthAndYear(allPreachings);
            const reportsPreaching = preachingsGrouped.map(PreachingReportService.generatePreachingReportForExport);

            const fileName = `Informes_de_Predicación_de_${ user.name }_${ user.surname }`;
            const preachingsTemplate = PdfPreachingsTemplate.generate({ fullName: `${ user.name } ${ user.surname }`, reports: reportsPreaching });

            const pdfPath = await PDF.writeFromHTML({
                directory: 'Exports',
                fileName,
                html: preachingsTemplate
            });

            await FileSystem.moveFile({
                from: pdfPath,
                to: `${ FileSystem.downloadDir }/${ fileName }.pdf`
            });

            if (showStatusMessage) setStatus({ code: 200, msg: preachingMessages.EXPORTED_SUCCESS });
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsPreachingsExporting(false);
        }
    }

    /**
     * Load preachings from the database and set them in the state.
     *
     * @param {Date} date - Date of preaching (month)
     * @return {Promise<void>} This function does not return anything.
     */
    const loadPreachings = async (date: Date): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsPreachingsLoading(true);

        try {
            const preachings = await PreachingService.getByUserIdAndMonth(user.id, date);
            setPreachings(preachings);
        }
        catch (error) {
            setIsPreachingsLoading(false);
            setError(error);
        }
    }

    /**
     * This function is to save the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - The values for save preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const savePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsPreachingLoading(true);

        try {
            const createDto = CreatePreachingDto.create({ ...preachingValues, userId: user.id });
            const result = await PreachingService.create(createDto);

            if (Time.format(result.day, 'MMMM') === Time.format(state.selectedDate, 'MMMM')) addPreaching(result);

            setStatus({ code: 201, msg: preachingMessages.ADDED_SUCCESS });
            navigation.goBack();
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsPreachingLoading(false);
        }
    }

    /**
     * This function is to update the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - Values to update preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const updatePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        const wifi = hasWifiConnection();
        if (!wifi) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const canAlterate = canAlteratePreaching(preachingMessages.UNSELECTED_UPDATE);
        if (!canAlterate) return;

        setIsPreachingLoading(true);

        try {
            const updateDto = UpdatePreachingDto.create(preachingValues);
            const preaching = await PreachingService.update(state.seletedPreaching.id, user.id, updateDto);

            updatePreachingState(preaching);
            setStatus({ code: 200, msg: preachingMessages.UPDATED_SUCCESS });

            resetSelectedPreaching();
            navigation.goBack();
        }
        catch (error) {
            setIsPreachingLoading(false);
            setError(error);
        }
    }

    return {
        state,

        // Actions
        clearPreaching,
        setIsPreachingsLoading,
        setSelectedDate,
        setSelectedPreaching,

        // Functions
        deletePreaching,
        exportPreachings,
        loadPreachings,
        savePreaching,
        updatePreaching
    }
}

export default usePreaching;